import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Inquiry extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column()
  declare company: string | null

  @column()
  declare email: string

  @column()
  declare phone: string | null

  @column()
  declare serviceInterest: string

  @column()
  declare message: string

  @column()
  declare status: 'new' | 'read' | 'replied'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
