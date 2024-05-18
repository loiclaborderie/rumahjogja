import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'property_tag'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('property_id')
        .unsigned()
        .references('id')
        .inTable('properties')
        .onDelete('CASCADE')
      table.integer('tag_id').unsigned().references('id').inTable('tags').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
