import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { DilemmaRepository } from '#vote/repositories/dilemma_repository'
import { VoteRepository } from '#vote/repositories/vote_repository'
import { DilemmaViewModel } from '#vote/view_models/dilemma_view_model'

@inject()
export default class ShowDilemmaController {
  constructor(
    private dilemmaRepository: DilemmaRepository,
    private voteRepository: VoteRepository
  ) {}

  async execute({ params, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const dilemma = await this.dilemmaRepository.findRandomDilemmaByPropositions(
      params.firstProp,
      params.secondProp
    )

    const vote = await this.voteRepository.findVoteByUserId(
      user.id,
      dilemma ? dilemma.propositions.map((p) => p.id) : []
    )

    let result = null

    if (vote) {
      result = await this.dilemmaRepository.getVoteResult(vote.propositionId)
    }

    return response.ok({
      dilemma: dilemma ? DilemmaViewModel.fromModel(dilemma).serialize() : null,
      result,
    })
  }
}
