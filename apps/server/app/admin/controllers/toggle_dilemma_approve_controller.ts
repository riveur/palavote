import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { DilemmaRepository } from '#vote/repositories/dilemma_repository'

@inject()
export default class ToggleDilemmaApproveController {
  constructor(private dilemmaRepository: DilemmaRepository) {}

  async execute({ auth, response, params }: HttpContext) {
    const user = auth.getUserOrFail()

    if (user.role !== 'ADMIN') {
      return response.unauthorized()
    }

    await this.dilemmaRepository.toggleApprove(params.id)

    return response.noContent()
  }
}
