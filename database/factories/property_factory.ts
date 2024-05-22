import factory from '@adonisjs/lucid/factories'
import Property from '#models/property'
import { UserFactory } from './user_factory.js'
import { DateTime } from 'luxon'

export const PropertyFactory = factory
  .define(Property, async ({ faker }) => {
    const soldAt =
      Math.random() < 0.3
        ? DateTime.fromJSDate(faker.date.recent()).toFormat('yyyy-MM-dd HH:mm:ss')
        : undefined
    return {
      name: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      price: faker.number.int({ min: 10000, max: 1000000 }),
      location: faker.location.city(),
      soldAt: soldAt as DateTime | undefined,
      roomNumber: faker.number.int({ min: 1, max: 7 }),
      bathroomNumber: faker.number.int({ min: 1, max: 5 }),
      floorNumber: faker.number.int({ min: 1, max: 5 }),
      buildingSurface: faker.number.int({ min: 50, max: 1000 }),
      landSurface: faker.number.int({ min: 50, max: 1000 }),
    }
  })
  .relation('user', () => UserFactory)
  .build()
