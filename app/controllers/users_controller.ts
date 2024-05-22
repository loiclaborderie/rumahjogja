import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/user'

export default class UsersController {
  async register({ request, response }: HttpContext) {
    let userData = await request.validateUsing(createUserValidator)

    const existingUser = await User.findBy('email', userData.email)
    if (existingUser) {
      return response.badRequest({ message: 'Email already in use' })
    }
    const user = await User.create(userData)
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

  async getUserProperties({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    await user.load('properties')
    return response.status(200).send(user.properties)
  }
}
