import type { Infer } from '@vinejs/vine/types'

import UpdateUserController from '#admin/controllers/update_user_controller'
import { UserRole } from '#auth/enums/user_role'
import User from '#auth/models/user'

type UserCreatePayload = {
  username: string
  avatarUrl: string
}

export class UserRepository {
  async update(id: number, payload: Infer<(typeof UpdateUserController)['validator']>) {
    const user = await User.findOrFail(id)

    await user.merge(payload).save()

    return user
  }
  async findOrCreate(discordId: string, payload: UserCreatePayload) {
    const user = await User.firstOrCreate({ discordId }, { ...payload, role: UserRole.USER })
    return user
  }

  async createAccessToken(user: User) {
    const token = await User.accessTokens.create(user)

    return {
      type: 'Bearer',
      value: token.value!.release(),
    }
  }

  async findAll() {
    return User.all()
  }
}
