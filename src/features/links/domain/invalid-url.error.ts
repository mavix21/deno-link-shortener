import { Data } from "effect";

export class InvalidUrl extends Data.TaggedError("InvalidUrl")<{
  message: string;
  url: string;
}> {}
