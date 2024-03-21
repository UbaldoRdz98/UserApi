import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(6),
    email: vine.string().trim().email(),
    password: vine.string().trim().escape()
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(6),
    email: vine.string().trim().email(),
    password: vine.string().trim().escape()
  })
)

export const deleteUserValidator = vine.compile(
  vine.object({
    id: vine.string().trim()
  })
)
