import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Tag from './tag.js'

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
  declare soldAt?: DateTime | null

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

  @manyToMany(() => Tag)
  declare tags: ManyToMany<typeof Tag>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
