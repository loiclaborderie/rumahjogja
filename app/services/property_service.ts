import Property from '#models/property'
import { PropertySortOptions } from '../types/sort_options.js'

export default class PropertyService {
  static propertiesPerPage = 30
  static sortOptions: PropertySortOptions[] = [
    {
      id: 'price_asc',
      field: 'price',
      direction: 'asc',
    },
    {
      id: 'price_desc',
      field: 'price',
      direction: 'desc',
    },
    {
      id: 'newest',
      field: 'created_at',
      direction: 'desc',
    },
  ]
  static getFiltered(filters: Record<string, any>) {
    const sort =
      this.sortOptions.find((option) => option.id === filters.sortBy) || this.sortOptions[0]
    return Property.query()
      .whereNull('sold_at')
      .if(filters.search, (query) => query.whereILike('name', `%${filters.search}%`))
      .if(filters.minPrice, (query) => query.where('price', '>=', filters.minPrice))
      .if(filters.maxPrice, (query) => query.where('price', '<=', filters.maxPrice))
      .if(filters.minRooms, (query) => query.where('room_number', '>=', filters.minRooms))
      .if(filters.maxRooms, (query) => query.where('room_number', '<=', filters.maxRooms))
      .if(filters.minBathrooms, (query) =>
        query.where('bathroom_number', '>=', filters.minBathrooms)
      )
      .if(filters.maxBathrooms, (query) =>
        query.where('bathroom_number', '<=', filters.maxBathrooms)
      )
      .if(filters.minFloor, (query) => query.where('floorNumber', '>=', filters.minFloor))
      .if(filters.maxFloor, (query) => query.where('floorNumber', '<=', filters.maxFloor))
      .if(filters.minBuildingSurface, (query) =>
        query.where('building_surface', '>=', filters.minBuildingSurface)
      )
      .if(filters.maxBuildingSurface, (query) =>
        query.where('building_surface', '<=', filters.maxBuildingSurface)
      )
      .orderBy(sort.field, sort.direction)
      .paginate(filters.page || 1, this.propertiesPerPage)
  }
}
