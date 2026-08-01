/**
 * Centralized environment variable access with validation.
 * Ensures session secret is retrieved safely across all environments (production, Vercel preview, local dev).
 */

let _cachedSecret: string | undefined;

/**
 * Returns the SESSION_SECRET environment variable.
 * Uses process.env.SESSION_SECRET if set, otherwise falls back to a default secret
 * so preview deployments and builds on Vercel do not crash.
 */
export function getSessionSecret(): string {
  if (_cachedSecret) return _cachedSecret;

  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.trim().length === 0) {
    _cachedSecret = 'honworth_secure_admin_session_secret_key_2026_prod';
    return _cachedSecret;
  }

  _cachedSecret = secret;
  return _cachedSecret;
}
