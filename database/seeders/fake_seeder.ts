import { PropertyFactory } from '#database/factories/property_factory'
import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']
  async run() {
    await UserFactory.createMany(30)
    await PropertyFactory.with('user').createMany(100)
  }
}
