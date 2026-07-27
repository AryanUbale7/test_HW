import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ============================================================
// In-Memory Fallback Rate Limiter
// Used when Upstash Redis credentials are not configured.
// Provides real rate limiting instead of silently bypassing.
// ============================================================

class InMemoryRateLimiter {
  private store = new Map<string, { count: number; resetAt: number }>();
  private maxRequests: number;
  private windowMs: number;
  private lastCleanup = Date.now();
  private readonly CLEANUP_INTERVAL_MS = 60_000; // Cleanup stale entries every 60s

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  check(key: string): { success: boolean; remaining: number } {
    this.maybeCleanup();
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || now > entry.resetAt) {
      this.store.set(key, { count: 1, resetAt: now + this.windowMs });
      return { success: true, remaining: this.maxRequests - 1 };
    }

    if (entry.count >= this.maxRequests) {
      return { success: false, remaining: 0 };
    }

    entry.count++;
    return { success: true, remaining: this.maxRequests - entry.count };
  }

  private maybeCleanup() {
    const now = Date.now();
    if (now - this.lastCleanup < this.CLEANUP_INTERVAL_MS) return;
    this.lastCleanup = now;
    for (const [key, entry] of this.store) {
      if (now > entry.resetAt) {
        this.store.delete(key);
      }
    }
  }
}

class InMemoryCounter {
  private store = new Map<string, { count: number; expiresAt: number }>();
  private lastCleanup = Date.now();

  async incr(key: string, ttlSeconds: number): Promise<number> {
    this.maybeCleanup();
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || now > entry.expiresAt) {
      this.store.set(key, { count: 1, expiresAt: now + ttlSeconds * 1000 });
      return 1;
    }

    entry.count++;
    return entry.count;
  }

  async get(key: string): Promise<number> {
    const now = Date.now();
    const entry = this.store.get(key);
    if (!entry || now > entry.expiresAt) return 0;
    return entry.count;
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }

  private maybeCleanup() {
    const now = Date.now();
    if (now - this.lastCleanup < 60_000) return;
    this.lastCleanup = now;
    for (const [key, entry] of this.store) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
      }
    }
  }
}

// ============================================================
// Determine whether to use Redis or in-memory fallback
// ============================================================

const hasRedis = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

let redis: Redis | null = null;
if (hasRedis) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

// Upstash-backed limiters (only created when Redis is available)
let upstashContactLimiter: Ratelimit | null = null;
let upstashNewsletterLimiter: Ratelimit | null = null;

if (redis) {
  upstashContactLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: true,
    prefix: "ratelimit:contact",
  });

  upstashNewsletterLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "10 m"),
    analytics: true,
    prefix: "ratelimit:newsletter",
  });
}

// In-memory fallback limiters (always available)
const memoryContactLimiter = new InMemoryRateLimiter(5, 10 * 60 * 1000);    // 5 req / 10 min
const memoryNewsletterLimiter = new InMemoryRateLimiter(10, 10 * 60 * 1000); // 10 req / 10 min
const memoryFailedLoginCounter = new InMemoryCounter();

// Exported limiters (for checkRateLimit signature compatibility)
export const contactFormLimiter = upstashContactLimiter as any;
export const newsletterLimiter = upstashNewsletterLimiter as any;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

/**
 * Checks if a request is allowed by the rate limiter.
 * Uses Upstash Redis when available, falls back to in-memory limiter.
 * NEVER silently bypasses rate limiting.
 */
export async function checkRateLimit(
  ip: string,
  limiter: Ratelimit
): Promise<RateLimitResult> {
  // Use Upstash Redis if available
  if (hasRedis && limiter) {
    const { success, remaining } = await limiter.limit(ip);
    return { allowed: success, remaining };
  }

  // In-memory fallback — determine which limiter to use based on the limiter reference
  const memLimiter = limiter === contactFormLimiter ? memoryContactLimiter : memoryNewsletterLimiter;
  const { success, remaining } = memLimiter.check(ip);
  return { allowed: success, remaining };
}

/**
 * Increments failed login counter for an IP address.
 * Uses Redis if available, otherwise in-memory counter.
 * Sets expiry of 15 minutes (900 seconds) on creation.
 */
export async function incrementFailedLogin(ip: string): Promise<number> {
  if (hasRedis && redis) {
    const key = `failed-login:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, 900);
    }
    return count;
  }

  // In-memory fallback
  return memoryFailedLoginCounter.incr(`failed-login:${ip}`, 900);
}

/**
 * Checks how many failed login attempts have been registered for an IP address.
 */
export async function getFailedLoginAttempts(ip: string): Promise<number> {
  if (hasRedis && redis) {
    const count = await redis.get<number>(`failed-login:${ip}`);
    return count || 0;
  }

  return memoryFailedLoginCounter.get(`failed-login:${ip}`);
}

/**
 * Resets the failed login counter for an IP address after a successful login.
 */
export async function resetFailedLogin(ip: string): Promise<void> {
  if (hasRedis && redis) {
    await redis.del(`failed-login:${ip}`);
    return;
  }

  await memoryFailedLoginCounter.del(`failed-login:${ip}`);
}
