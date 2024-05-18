import { PropertyFactory } from '#database/factories/property_factory'
import { TagFactory } from '#database/factories/tag_factory'
import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']
  async run() {
    await UserFactory.createMany(30)
    const properties = await PropertyFactory.with('user').createMany(100)
    const tags = await TagFactory.createMany(20)

    for (const property of properties) {
      const randomTags = tags
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * tags.length) + 1)
      await property.related('tags').attach(randomTags.map((tag) => tag.id))
    }
  }
}
