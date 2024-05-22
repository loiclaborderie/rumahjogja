import vine from '@vinejs/vine'

export const propertyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    description: vine.string().trim().minLength(3),
    price: vine.number().min(0),
    location: vine.string().trim().minLength(3),
    roomNumber: vine.number().min(1),
    bathroomNumber: vine.number().min(1),
    floorNumber: vine.number().min(0),
    buildingSurface: vine.number().min(0),
    landSurface: vine.number().min(0),
    tags: vine.array(vine.number().min(1)).optional(),
  })
)
