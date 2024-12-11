import { Schema } from "effect";

const Link = Schema.Struct({
  shortCode: Schema.String,
  longUrl: Schema.String,
  createdAt: Schema.Number,
  userId: Schema.String,
  clickCount: Schema.Number,
  lastClickedEvent: Schema.optional(Schema.Number),
});

type Link = Schema.Schema.Type<typeof Link>;
