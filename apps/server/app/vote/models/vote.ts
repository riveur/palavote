import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import User from '#auth/models/user'
import Proposition from '#vote/models/proposition'

export default class Vote extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number | null

  @column()
  declare propositionId: number

  @column()
  declare anonymousUsername: string | null

  @belongsTo(() => User)
  declare voter: BelongsTo<typeof User> | null

  @belongsTo(() => Proposition)
  declare proposition: BelongsTo<typeof Proposition>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
