import crypto from 'crypto';

const TARGET_ITERATIONS = 210000;
const KEY_LEN = 64;
const DIGEST = 'sha512';

export interface VerifyPasswordResult {
  isValid: boolean;
  needsRehash: boolean;
}

/**
 * Hash a password using PBKDF2 with 210,000 iterations (OWASP recommendation for HMAC-SHA512).
 * Format: salt:iterations:hash
 */
export function hashPassword(password: string, iterations = TARGET_ITERATIONS): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, iterations, KEY_LEN, DIGEST).toString('hex');
  return `${salt}:${iterations}:${hash}`;
}

/**
 * Verify a password against a stored hash.
 * Supports legacy format (salt:hash with 10,000 iterations) and new format (salt:iterations:hash).
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  return verifyPasswordDetailed(password, storedHash).isValid;
}

/**
 * Detailed password verification returning isValid and whether the hash needs upgrading to 210,000 iterations.
 */
export function verifyPasswordDetailed(password: string, storedHash: string): VerifyPasswordResult {
  try {
    const parts = storedHash.split(':');
    if (parts.length === 2) {
      // Legacy format: salt:hash (10,000 iterations)
      const [salt, hash] = parts;
      const checkHash = crypto.pbkdf2Sync(password, salt, 10000, KEY_LEN, DIGEST).toString('hex');
      const isValid = crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(checkHash, 'hex'));
      return { isValid, needsRehash: isValid };
    } else if (parts.length === 3) {
      // New format: salt:iterations:hash
      const [salt, iterStr, hash] = parts;
      const iterations = parseInt(iterStr, 10);
      if (isNaN(iterations) || iterations < 1000) return { isValid: false, needsRehash: false };

      const checkHash = crypto.pbkdf2Sync(password, salt, iterations, KEY_LEN, DIGEST).toString('hex');
      const isValid = crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(checkHash, 'hex'));
      const needsRehash = isValid && iterations < TARGET_ITERATIONS;
      return { isValid, needsRehash };
    }
    return { isValid: false, needsRehash: false };
  } catch (err) {
    console.error('Password verification error:', err);
    return { isValid: false, needsRehash: false };
  }
}

