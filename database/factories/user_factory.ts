import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { PropertyFactory } from './property_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isSeller: faker.number.int({ min: 0, max: 1 }),
    }
  })
  .relation('properties', () => PropertyFactory)
  .build()
