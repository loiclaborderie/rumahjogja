import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'properties'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description', 'longtext').notNullable()
      table.bigint('price').notNullable()
      table.string('location').notNullable()
      table.integer('room_number').notNullable()
      table.integer('bathroom_number').notNullable()
      table.integer('floor_number').notNullable()
      table.integer('building_surface').notNullable()
      table.integer('land_surface').notNullable()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.timestamp('sold_at').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
