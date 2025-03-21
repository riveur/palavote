import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

import { UserRole } from '#auth/enums/user_role'
import { UserRepository } from '#auth/repositories/user_repository'
import { UserInfoViewModel } from '#auth/view_models/user_info_view_model'

@inject()
export default class UpdateUserController {
  constructor(private userRepository: UserRepository) {}

  static validator = vine.compile(
    vine.object({
      role: vine.enum(Object.values(UserRole)),
    })
  )

  async execute({ auth, response, request, params }: HttpContext) {
    const user = auth.getUserOrFail()

    if (user.role !== 'ADMIN') {
      return response.unauthorized()
    }

    const payload = await request.validateUsing(UpdateUserController.validator)

    const result = await this.userRepository.update(params.id, payload)

    return response.ok(UserInfoViewModel.fromModel(result).serialize())
  }
}
