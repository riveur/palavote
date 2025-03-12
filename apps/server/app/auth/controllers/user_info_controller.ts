import { HttpContext } from '@adonisjs/core/http'

import { UserInfoViewModel } from '#auth/view_models/user_info_view_model'

export default class UserInfoController {
  async me({ auth, response }: HttpContext) {
    const user = UserInfoViewModel.fromModel(auth.getUserOrFail()).serialize()
    return response.ok(user)
  }
}
