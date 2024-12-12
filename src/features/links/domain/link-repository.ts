import { Context, Effect } from "effect";
import { Link } from "./link.schema.ts";

export interface ILinkRepository {
  storeShortLink: (
    link: Link,
  ) => Effect.Effect<void>;

  getShortLink: (shortCode: string) => Effect.Effect<Link | null>;
}

export class LinkRepositoryContext extends Context.Tag("LinkRepository")<
  LinkRepositoryContext,
  ILinkRepository
>() {}
