import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'inquiries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('full_name').notNullable()
      table.string('company').nullable()
      table.string('email').notNullable()
      table.string('phone').nullable()
      table.string('service_interest').notNullable()
      table.text('message').notNullable()
      table.enum('status', ['new', 'read', 'replied']).defaultTo('new')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
