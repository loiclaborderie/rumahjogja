import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'properties'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.float('price').notNullable()
      table.string('location').notNullable()
      table.integer('room_number').notNullable()
      table.integer('bathroom_number').notNullable()
      table.integer('floor_number').notNullable()
      table.boolean('is_sold').defaultTo(false)
      table.string('metrics').defaultTo('meters')
      table.integer('building_surface').notNullable()
      table.integer('land_surface').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
