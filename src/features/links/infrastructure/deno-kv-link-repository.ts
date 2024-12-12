import { Effect } from "effect";
import { ILinkRepository } from "../domain/link-repository.ts";
import { Link } from "../domain/link.schema.ts";
import { orDieWith } from "effect/Effect";

export class DenoKvLinkRepository implements ILinkRepository {
  storeShortLink = (link: Link) =>
    Effect.gen(function* () {
      const kv = yield* Effect.tryPromise(
        () => Deno.openKv(),
      ).pipe(
        orDieWith((err) => {
          console.log(err);
          return new Error("Failed to open KV store", { cause: err });
        }),
      );

      const shortLinkKey = ["shortLinks", link.shortCode];
      const res = yield* Effect.promise(() => kv.set(shortLinkKey, link));

      if (!res) {
        yield* Effect.dieMessage("Failed to store short link");
      }
    });

  getShortLink = (shortCode: string) =>
    Effect.gen(function* () {
      const kv = yield* Effect.tryPromise(
        () => Deno.openKv(),
      ).pipe(orDieWith(() => new Error("Failed to open KV store")));

      const shortLinkKey = ["shortLinks", shortCode];
      const link = yield* Effect.promise(() => kv.get<Link>(shortLinkKey));

      if (!link) {
        yield* Effect.dieMessage("Short link not found");
      }

      return link.value;
    });
}
