import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Property from './property.js'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @manyToMany(() => Property)
  declare properties: ManyToMany<typeof Property>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
