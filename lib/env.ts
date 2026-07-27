/**
 * Centralized environment variable access with mandatory validation.
 * Ensures critical secrets are never silently replaced with defaults.
 */

let _cachedSecret: string | undefined;

/**
 * Returns the SESSION_SECRET environment variable.
 * Throws a fatal error if it is not set — the application MUST NOT
 * fall back to a hardcoded default under any circumstances.
 */
export function getSessionSecret(): string {
  if (_cachedSecret) return _cachedSecret;

  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.trim().length === 0) {
    throw new Error(
      'FATAL: SESSION_SECRET environment variable is not set. ' +
      'The application cannot start without a cryptographically secure session secret. ' +
      'Generate one with: openssl rand -base64 32'
    );
  }

  _cachedSecret = secret;
  return _cachedSecret;
}
