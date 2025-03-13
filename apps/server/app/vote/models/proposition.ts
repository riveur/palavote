import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import Dilemma from '#vote/models/dilemma'
import Vote from '#vote/models/vote'

export default class Proposition extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare imageUrl: string

  @column()
  declare isApproved: boolean

  @column()
  declare dilemmaId: number

  @belongsTo(() => Dilemma)
  declare dilemma: BelongsTo<typeof Dilemma>

  @hasMany(() => Vote)
  declare votes: HasMany<typeof Vote>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
