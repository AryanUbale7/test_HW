import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Upstash Redis client
// URL and Token are retrieved from environment variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// contactFormLimiter: 5 requests per 10 minutes per IP
export const contactFormLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
  prefix: "ratelimit:contact",
});

// newsletterLimiter: 10 requests per 10 minutes per IP
export const newsletterLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 m"),
  analytics: true,
  prefix: "ratelimit:newsletter",
});

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

/**
 * Checks if a request is allowed by the rate limiter.
 * @param ip The IP address of the requester
 * @param limiter The Ratelimit instance (contactFormLimiter or newsletterLimiter)
 * @returns A promise resolving to whether it's allowed and remaining quota.
 */
export async function checkRateLimit(
  ip: string,
  limiter: Ratelimit
): Promise<RateLimitResult> {
  // If the env vars are missing, we gracefully warn and bypass in dev to prevent crashes
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn("WARNING: Upstash Redis environment variables are not set. Bypassing rate limiting in development.");
    return {
      allowed: true,
      remaining: 999,
    };
  }

  const { success, remaining } = await limiter.limit(ip);
  return {
    allowed: success, // success is true if request is allowed, false if rate limited
    remaining,
  };
}

/**
 * Increments failed login counter for an IP address in Upstash Redis.
 * Sets expiry of 15 minutes (900 seconds) on creation.
 */
export async function incrementFailedLogin(ip: string): Promise<number> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return 0; // Bypass in dev when vars are missing
  }
  const key = `failed-login:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, 900); // Expires in 15 minutes
  }
  return count;
}

/**
 * Checks how many failed login attempts have been registered for an IP address.
 */
export async function getFailedLoginAttempts(ip: string): Promise<number> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return 0;
  }
  const count = await redis.get<number>(`failed-login:${ip}`);
  return count || 0;
}

/**
 * Resets the failed login counter for an IP address after a successful login.
 */
export async function resetFailedLogin(ip: string): Promise<void> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return;
  }
  await redis.del(`failed-login:${ip}`);
}

