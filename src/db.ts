import { Console, Effect } from "effect";
import { LinkRepositoryContext } from "./features/links/domain/link-repository.ts";
import { generateShortCode } from "./features/links/domain/generate-short-code.ts";
import { DenoKvLinkRepository } from "./features/links/infrastructure/deno-kv-link-repository.ts";

const program = Effect.gen(function* () {
  const longUrl = "https://deno.land/manual";
  const shortCode = yield* generateShortCode(longUrl);
  const linkRepository = yield* LinkRepositoryContext;
  const userId = "test";

  yield* Console.log("Before storing link");
  yield* linkRepository.storeShortLink({
    longUrl,
    userId,
    clickCount: 0,
    shortCode,
    createdAt: Date.now(),
  });

  const link = yield* linkRepository.getShortLink(shortCode);
  yield* Console.log(link);
});

const runnable = Effect.provideService(
  program,
  LinkRepositoryContext,
  new DenoKvLinkRepository(),
);

Effect.runPromise(runnable);
