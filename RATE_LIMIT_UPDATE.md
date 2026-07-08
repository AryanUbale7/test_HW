# Rate Limiting Configuration Update

The in-memory rate limiter has been replaced with a production-grade, distributed rate limiter powered by Upstash Redis. This ensures reliable rate limiting across stateless serverless invocations on Vercel.

## Mappings and Limits
- **Contact Form submissions (`/api/contact`):** Max 5 requests per 10 minutes per IP (`contactFormLimiter`).
- **Newsletter Signups (`/api/newsletter-signup`):** Max 10 requests per 10 minutes per IP (`newsletterLimiter`).
- **Algorithm:** Sliding Window.

## Required Environment Variables
To enable rate limiting in production (Vercel) and local development, you **must** configure the following environment variables:

```env
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

*Note: In local development, if these variables are omitted, the rate limiter will print a console warning and gracefully bypass constraints, allowing form submissions to proceed without errors.*

## Testing local rate limits
1. Add valid `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` values to your `.env.local` file.
2. Restart the local development server.
3. Submit the contact form 6 times in quick succession.
4. Verify that the 6th submission fails with a `429 Too Many Requests` status and returns the error message: `{"error": "Too many requests. Please try again in a few minutes."}`.
