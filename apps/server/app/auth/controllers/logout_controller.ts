import { HttpContext } from '@adonisjs/core/http'

import User from '#auth/models/user'

export default class LogoutController {
  async execute({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }

    return response.noContent()
  }
}
