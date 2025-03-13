import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { DilemmaRepository } from '#vote/repositories/dilemma_repository'
import { DilemmaViewModel } from '#vote/view_models/dilemma_view_model'

@inject()
export default class PickDilemmaController {
  constructor(private dilemmaRepository: DilemmaRepository) {}

  async execute({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const dilemma = await this.dilemmaRepository.findRandomDilemmaByUserId(user.id)

    return response.ok(dilemma ? DilemmaViewModel.fromModel(dilemma).serialize() : null)
  }
}
