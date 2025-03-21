import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { UserRepository } from '#auth/repositories/user_repository'
import { UserInfoViewModel } from '#auth/view_models/user_info_view_model'

@inject()
export default class ListUserController {
  constructor(private userRepository: UserRepository) {}

  async execute({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    if (user.role !== 'ADMIN') {
      return response.unauthorized()
    }

    const users = await this.userRepository.findAll()

    return response.ok(users.map((u) => UserInfoViewModel.fromModel(u)).map((vm) => vm.serialize()))
  }
}
