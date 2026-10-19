import "server-only";

/** Token de sessão do painel: `payload.assinatura`, com HMAC-SHA256 (Web Crypto, roda também no proxy). */

interface SessionPayload {
  role: "admin";
  exp: number;
}

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

export async function signSessionToken(secret: string, ttlSeconds: number): Promise<string> {
  const payload: SessionPayload = { role: "admin", exp: Math.floor(Date.now() / 1000) + ttlSeconds };
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(secret), encoder.encode(body));
  return `${body}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifySessionToken(secret: string, token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [body, signature] = token.split(".");
  if (!body || !signature) return false;

  try {
    const valid = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(secret),
      fromBase64Url(signature),
      encoder.encode(body),
    );
    if (!valid) return false;
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(body))) as SessionPayload;
    return payload.role === "admin" && payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}
