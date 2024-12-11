import { encodeBase64Url } from "jsr:@std/encoding";
import { crypto } from "jsr:@std/crypto/crypto";

export async function generateShortCode(longUrl: string) {
  try {
    new URL(longUrl);
  } catch (error) {
    console.error(error);
    throw new Error("Invalid URL");
  }

  // Generate an unique identifier for the URL
  const urlData = new TextEncoder().encode(longUrl + Date.now());
  const hash = await crypto.subtle.digest("SHA-256", urlData);

  // Take the first 8 of the hash for the short URL
  return encodeBase64Url(hash.slice(0, 8));
}

const kv = await Deno.openKv();

export type ShortLink = {
  shortCode: string;
  longUrl: string;
  createdAt: number;
  userId: string;
  clickCount: number;
  lastClickedEvent?: string;
};

export async function storeShortLink(
  longUrl: string,
  shortCode: string,
  userId: string,
) {
  const shortLinkKey = ["shortLinks", shortCode];
  const data: ShortLink = {
    shortCode,
    longUrl,
    userId,
    createdAt: Date.now(),
    clickCount: 0,
  };

  const res = await kv.set(shortLinkKey, data);

  if (!res) {
    throw new Error("Failed to store short link");
  }

  return res;
}

export async function getShortLink(shortCode: string) {
  const link = await kv.get<ShortLink>(["shortLinks", shortCode]);

  return link.value;
}

const longUrl = "https://deno.land/manual";
const shortCode = await generateShortCode(longUrl);
const userId = "test";

console.log(shortCode);

await storeShortLink(longUrl, shortCode, userId);

const link = await getShortLink(shortCode);
console.log(link);
