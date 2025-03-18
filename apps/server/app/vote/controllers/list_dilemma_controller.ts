import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

import { DilemmaRepository } from '#vote/repositories/dilemma_repository'
import { AllDilemmaViewModel } from '#vote/view_models/all_dilemma_view_model'

@inject()
export default class ListDilemmaController {
  constructor(private dilemmaRepository: DilemmaRepository) {}

  static queryValidator = vine.compile(
    vine.object({
      only_approved: vine.boolean().parse((value) => value === 'true'),
    })
  )

  async execute({ auth, response, request }: HttpContext) {
    const query = await ListDilemmaController.queryValidator.validate(request.qs())
    const onlyApproved = auth.user?.role === 'ADMIN' ? query.only_approved : true

    console.log({ auth: auth.user?.role })

    console.log({ onlyApproved })

    const dilemmas = await this.dilemmaRepository.findAll({ onlyApproved: onlyApproved })

    return response.ok(AllDilemmaViewModel.fromModel(dilemmas).serialize())
  }
}
