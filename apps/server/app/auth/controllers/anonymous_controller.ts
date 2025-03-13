import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import vine from '@vinejs/vine'

import { UserRepository } from '#auth/repositories/user_repository'

@inject()
export default class AnonymousController {
  constructor(private userRepository: UserRepository) {}

  static validator = vine.compile(vine.object({ username: vine.string() }))

  async execute({ request, response }: HttpContext) {
    const payload = await request.validateUsing(AnonymousController.validator)

    const user = await this.userRepository.findAnonymousOrCreate(payload.username)

    //? This is a security measure to prevent timing attacks.
    await hash.use('scrypt').make('password')

    const token = await this.userRepository.createAccessToken(user)

    return response.ok(token)
  }
}
