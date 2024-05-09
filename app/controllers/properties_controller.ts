import type { HttpContext } from '@adonisjs/core/http'
import Property from '#models/property'

export default class PropertiesController {
  async create({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    console.log(auth, auth.user, user)
    const data = request.only([
      'name',
      'description',
      'price',
      'location',
      'room_number',
      'bathroom_number',
      'floorNumber',
      'metrics',
      'building_surface',
      'land_surface',
    ])
    const property = await Property.create(data)
    await user.related('properties').save(property)
    return response.status(201).send({ property, message: 'Property created successfully' })
  }

  async index({ response }: HttpContext) {
    const properties = await Property.query().preload('user')
    return response.status(200).send(properties)
  }
}
