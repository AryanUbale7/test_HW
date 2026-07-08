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
