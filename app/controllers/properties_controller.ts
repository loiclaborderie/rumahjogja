import type { HttpContext } from '@adonisjs/core/http'
import Property from '#models/property'
import PropertyService from '#services/property_service'

export default class PropertiesController {
  async index({ response, request }: HttpContext) {
    const properties = PropertyService.getFiltered(request.qs())
    return response.status(200).send(properties)
  }

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
      'is_sold',
      'metrics',
      'building_surface',
      'land_surface',
    ])
    const property = await Property.create(data)
    await user.related('properties').save(property)
    return response.status(201).send({ property, message: 'Property created successfully' })
  }

  async delete({ params, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const property = await user.related('properties').query().where('id', params.id).firstOrFail()
    await property.delete()
    return response.status(200).send({ message: 'Property deleted successfully' })
  }

  async edit({ params, response, auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const property = await user.related('properties').query().where('id', params.id).firstOrFail()
    const data = request.only([
      'name',
      'description',
      'price',
      'location',
      'room_number',
      'bathroom_number',
      'floorNumber',
      'is_sold',
      'metrics',
      'building_surface',
      'land_surface',
    ])
    console.log('actual data received', data)
    property.merge(data).save()
    return response.status(200).send({ message: 'Property modified successfully', data, property })
  }

  async show({ params, response }: HttpContext) {
    const property = await Property.query().where('id', params.id).preload('user').firstOrFail()
    return response.status(200).send(property)
  }
}
