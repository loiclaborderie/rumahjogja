import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().trim().email().maxLength(255),
    phone: vine.string().trim().maxLength(255).optional(),
    password: vine.string().minLength(6).maxLength(255),
    isSeller: vine.number().min(0).max(1).optional(),
  })
)
