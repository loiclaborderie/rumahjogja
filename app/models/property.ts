import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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
  declare isSold: boolean

  @column()
  declare metrics: string

  @column()
  declare buildingSuface: string

  @column()
  declare landSurface: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
