import vine from '@vinejs/vine'

export const contactValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100),
    company: vine.string().trim().maxLength(100).optional(),
    email: vine.string().trim().email().maxLength(254),
    phone: vine.string().trim().maxLength(30).optional(),
    serviceInterest: vine.string().trim().minLength(2).maxLength(100),
    message: vine.string().trim().minLength(10).maxLength(2000),
  })
)
