import type { HttpContext } from '@adonisjs/core/http'
import Property from '#models/property'
import PropertyService from '#services/property_service'
import Tag from '#models/tag'
import { propertyValidator } from '#validators/property'
import { DateTime } from 'luxon'

export default class PropertiesController {
  async index({ response, request }: HttpContext) {
    const properties = await PropertyService.getFiltered(request.qs())
    console.log(properties)
    return response.status(200).send(properties)
  }

  async create({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    console.log(auth, auth.user, user)
    const data = await request.validateUsing(propertyValidator)
    const tagIds: number[] = data.tags || []

    const property = await Property.create(data)

    if (tagIds.length) {
      delete data.tags
      const tags = await Tag.query().whereIn('id', tagIds)
      await property.related('tags').saveMany(tags)
    }

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
    let data = await request.validateUsing(propertyValidator)
    console.log('validated', data)
    const isSold = request.only(['isSold']) || false
    console.log('actual data received', data)
    const tagIds: number[] = data.tags || []

    if (tagIds.length) {
      delete data.tags
      const tags = await Tag.query().whereIn('id', tagIds)
      await property.related('tags').saveMany(tags)
    }
    property.merge({ ...data, soldAt: isSold ? DateTime.now() : undefined }).save()
    return response.status(200).send({ message: 'Property modified successfully', property })
  }

  async show({ params, response }: HttpContext) {
    const property = await Property.query().where('id', params.id).preload('user').firstOrFail()
    return response.status(200).send(property)
  }
}
