import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { UserRepository } from '#auth/repositories/user_repository'

@inject()
export default class DiscordController {
  constructor(private userRepository: UserRepository) {}

  async redirect({ ally }: HttpContext) {
    return ally.use('discord').redirect()
  }

  async callback({ ally, response }: HttpContext) {
    const discord = ally.use('discord')

    if (discord.accessDenied()) {
      return response.unauthorized({ message: "Vous avez annulé le processus d'authentification." })
    }

    if (discord.stateMisMatch()) {
      return response.badRequest({
        message: 'Nous avons pas pu vérifier la requête, veuillez réessayer.',
      })
    }

    if (discord.hasError()) {
      return response.badRequest({
        message: `Une erreur est survenue: ${discord.getError() || 'Inconnue'}`,
      })
    }

    const discordUser = await discord.user()

    const user = await this.userRepository.findOrCreate(discordUser.id, {
      username: discordUser.original.global_name ?? discordUser.nickName,
      avatarUrl: discordUser.avatarUrl,
    })

    const token = await this.userRepository.createAccessToken(user)

    return response.ok(token)
  }
}
