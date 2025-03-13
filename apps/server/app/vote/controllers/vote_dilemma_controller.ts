import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

import { DilemmaRepository } from '#vote/repositories/dilemma_repository'
import { VoteRepository } from '#vote/repositories/vote_repository'
import { DilemmaViewModel } from '#vote/view_models/dilemma_view_model'

@inject()
export default class VoteDilemmaController {
  constructor(
    private dilemmaRepository: DilemmaRepository,
    private voteRepository: VoteRepository
  ) {}

  static validator = vine.compile(vine.object({ proposition_id: vine.number() }))

  async execute({ auth, response, request }: HttpContext) {
    const user = auth.getUserOrFail()

    const payload = await request.validateUsing(VoteDilemmaController.validator)

    const existingVote = await this.voteRepository.exists(user.id, payload.proposition_id)

    if (existingVote) {
      return response.badRequest({ message: 'Vous avez déjà voté pour ce dilemme.' })
    }

    await this.voteRepository.vote(user.id, payload.proposition_id)

    const nextDilemma = await this.dilemmaRepository.findRandomDilemmaByUserId(user.id)

    return response.ok({
      next: nextDilemma ? DilemmaViewModel.fromModel(nextDilemma).serialize() : null,
    })
  }
}
