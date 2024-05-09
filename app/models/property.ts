import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Property extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare location: string

  @column()
  declare roomNumber: number

  @column()
  declare bathroomNumber: number

  @column()
  declare floorNumber: number

  @column()
  declare isSold?: boolean

  @column()
  declare metrics?: string

  @column()
  declare buildingSurface: number

  @column()
  declare landSurface: number

  @column()
  declare userId: number

  // @belongsTo(() => User, {
  //   foreignKey: 'userId',
  // })
  // declare owner: BelongsTo<typeof User>
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
