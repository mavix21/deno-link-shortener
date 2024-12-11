import { Schema } from 'effect'

const Link = Schema.Struct({
  shortCode: Schema.String,
  longUrl: Schema.String,
  createdAt: Schema.Number,
  userId: Schema.String,
  clickCount: Schema.Number,
  lastClickedEvent: Schema.optionalWith(Schema.Number, { exact: true })
})

type Link = Schema.Schema.Type<typeof Link>
