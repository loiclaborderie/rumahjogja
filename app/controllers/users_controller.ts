import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async register({ request, response }: HttpContext) {
    const data = request.only(['full_name', 'email', 'password', 'is_seller'])

    const existingUser = await User.findBy('email', data.email)
    if (existingUser) {
      return response.badRequest({ message: 'Email already in use' })
    }
    const user = await User.create(data)
    const apiToken = await User.accessTokens.create(user)

    return response.status(200).send({ token: apiToken.value!.release() })
  }

  async retrieveToken({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const apiToken = await User.accessTokens.create(user)

    return response.status(200).send({ token: apiToken.value!.release() })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      console.log(user)
      const apiToken = await User.accessTokens.create(user)
      return response.status(200).send({ token: apiToken.value!.release() })
    } catch (error) {
      return response.badRequest({ message: 'Invalid credentials' })
    }
  }
}
