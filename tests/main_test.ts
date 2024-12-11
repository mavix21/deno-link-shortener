import { assertEquals, assertNotEquals, assertRejects } from "@std/assert";
import { delay } from "jsr:@std/async/delay";

import { generateShortCode } from "../src/db.ts";

Deno.test("URL Shortener ", async (t) => {
  await t.step("should generate a short code for a valid URL", async () => {
    const longUrl = "https://deno.land/manual";
    const shorCode = await generateShortCode(longUrl);

    assertEquals(typeof shorCode, "string");
    assertEquals(shorCode.length, 11);
  });

  await t.step("should be unique for each timestamp", async () => {
    const reallyLongUrl = "https://example.com/this/is/a/really/long/url";
    const a = await generateShortCode(reallyLongUrl);
    await delay(5);
    const b = await generateShortCode(reallyLongUrl);

    assertNotEquals(a, b);
  });

  await t.step("throw error on bad URL", () => {
    const longUrl = "not a url";

    assertRejects(async () => {
      await generateShortCode(longUrl);
    })
  })
})