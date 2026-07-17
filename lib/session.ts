/**
 * Utility to encode a string to base64url.
 */
function base64urlEncode(str: string): string {
  const base64 = btoa(unescape(encodeURIComponent(str)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Utility to decode a base64url string.
 */
function base64urlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return decodeURIComponent(escape(atob(base64)));
}

/**
 * Generate an HMAC-SHA256 signature using the Web Crypto API.
 * Works in Node.js 18+ and Next.js Edge Runtime.
 */
async function generateSignature(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const secretBytes = encoder.encode(secret);
  const dataBytes = encoder.encode(data);

  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    secretBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await globalThis.crypto.subtle.sign('HMAC', key, dataBytes);
  
  const signatureBytes = new Uint8Array(signatureBuffer);
  let binary = '';
  for (let i = 0; i < signatureBytes.byteLength; i++) {
    binary += String.fromCharCode(signatureBytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Sign a session payload.
 */
export async function signSession(payload: Record<string, any>, secret: string): Promise<string> {
  const header = base64urlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64urlEncode(JSON.stringify(payload));
  const signature = await generateSignature(`${header}.${body}`, secret);
  return `${header}.${body}.${signature}`;
}

/**
 * Constant-time string comparison helper to prevent timing attacks.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Verify and decode a session token. Returns payload if valid, else null.
 */
export async function verifySession(token: string, secret: string): Promise<any | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;

    const expectedSignature = await generateSignature(`${header}.${body}`, secret);
    if (!timingSafeEqual(signature, expectedSignature)) return null;

    const decodedBody = JSON.parse(base64urlDecode(body));

    // Check expiration
    if (decodedBody.exp && Date.now() > decodedBody.exp) {
      return null;
    }

    return decodedBody;
  } catch (err) {
    return null;
  }
}
