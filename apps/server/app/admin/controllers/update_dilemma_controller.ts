import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

import { DilemmaRepository } from '#vote/repositories/dilemma_repository'
import { DilemmaViewModel } from '#vote/view_models/dilemma_view_model'

@inject()
export default class UpdateDilemmaController {
  constructor(private dilemmaRepository: DilemmaRepository) {}

  static validator = vine.compile(
    vine.object({
      title: vine.string(),
      propositions: vine
        .array(
          vine.object({
            id: vine.number(),
            name: vine.string(),
            image_url: vine.string().url(),
          })
        )
        .fixedLength(2),
    })
  )

  async execute({ auth, request, response, params }: HttpContext) {
    const user = auth.getUserOrFail()

    if (user.role !== 'ADMIN') {
      return response.unauthorized()
    }

    const payload = await request.validateUsing(UpdateDilemmaController.validator)

    const dilemma = await this.dilemmaRepository.update(params.id, payload)

    return response.created(DilemmaViewModel.fromModel(dilemma).serialize())
  }
}
