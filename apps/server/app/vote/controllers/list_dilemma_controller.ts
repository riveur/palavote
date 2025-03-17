import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { DilemmaRepository } from '#vote/repositories/dilemma_repository'
import { AllDilemmaViewModel } from '#vote/view_models/all_dilemma_view_model'

@inject()
export default class ListDilemmaController {
  constructor(private dilemmaRepository: DilemmaRepository) {}

  async execute({ response }: HttpContext) {
    const dilemmas = await this.dilemmaRepository.findAll()

    return response.ok(AllDilemmaViewModel.fromModel(dilemmas).serialize())
  }
}
