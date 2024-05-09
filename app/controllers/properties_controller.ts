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
    await property.related('user').associate(user)
    return response.status(201).send({ property, message: 'Property created successfully' })
  }
}
