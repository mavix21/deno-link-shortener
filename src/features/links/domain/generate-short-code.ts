import { encodeBase64Url } from "jsr:@std/encoding";
import { Effect } from "effect";
import { InvalidUrl } from "./invalid-url.error.ts";

export const generateShortCode = (longUrl: string) =>
  Effect.gen(function* () {
    if (!URL.canParse(longUrl)) {
      yield* new InvalidUrl({ message: "Invalid URL", url: longUrl });
    }

    const urlData = new TextEncoder().encode(longUrl + Date.now());
    const hash = yield* Effect.tryPromise({
      try: () => crypto.subtle.digest("SHA-256", urlData),
      catch: (error) =>
        new Error("Failed to generate short code", { cause: error }),
    });

    return encodeBase64Url(hash.slice(0, 8));
  });
