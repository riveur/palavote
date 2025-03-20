import stringHelpers from '@adonisjs/core/helpers/string'
import type { Infer } from '@vinejs/vine/types'

import type UpdateDilemmaController from '#admin/controllers/update_dilemma_controller'
import Dilemma from '#vote/models/dilemma'
import Proposition from '#vote/models/proposition'
import Vote from '#vote/models/vote'
import db from '@adonisjs/lucid/services/db'

export class DilemmaRepository {
  async update(id: number, payload: Infer<(typeof UpdateDilemmaController)['validator']>) {
    const dilemma = await Dilemma.findOrFail(id)

    db.transaction(async () => {
      await dilemma.merge({ title: payload.title }).save()

      for (const prop of payload.propositions) {
        await Proposition.query()
          .where('id', prop.id)
          .update({
            name: prop.name,
            slug: stringHelpers.slug(`${prop.name}-${dilemma.id}`),
            imageUrl: prop.image_url,
          })
      }
    })

    await dilemma.load('author')
    await dilemma.load('propositions')

    return dilemma
  }

  findRandomDilemmaByPropositions(firstSlug: string, secondSlug: string) {
    return Dilemma.query()
      .preload('author')
      .preload('propositions')
      .whereHas('propositions', (query) => {
        query.where('slug', firstSlug).orWhere('slug', secondSlug)
      })
      .where('is_approved', true)
      .first()
  }

  async findRandomDilemmaByUserId(userId: number) {
    const votedDilemmasQuery = Vote.query().where('user_id', userId).select('proposition_id')

    const dilemma = await Dilemma.query()
      .preload('author')
      .preload('propositions')
      .whereDoesntHave('propositions', (query) => {
        query.whereIn('id', votedDilemmasQuery)
      })
      .where('is_approved', true)
      .orderByRaw('RANDOM()')
      .first()

    return dilemma
  }

  async getVoteResult(propositionId: number) {
    const dilemma = await Dilemma.query()
      .preload('propositions')
      .whereHas('propositions', (query) => {
        query.where('id', propositionId)
      })
      .firstOrFail()

    const votes = await Vote.query()
      .select(['id', 'proposition_id'])
      .whereIn(
        'proposition_id',
        dilemma.propositions.map((p) => p.id)
      )

    const totalVotes = votes.length
    const votesForCurrentProposition = votes.filter((v) => v.propositionId === propositionId).length

    return {
      propositionId,
      totalVotes,
      votesForCurrentProposition,
    }
  }

  async findAll(filters: { onlyApproved?: boolean } = {}) {
    const { onlyApproved = true } = filters

    const query = Dilemma.query()
      .preload('author')
      .preload('propositions', (q) => {
        q.preload('votes')
      })
      .orderBy('created_at', 'desc')

    if (onlyApproved) {
      query.where('is_approved', true)
    }

    return query.exec()
  }

  async toggleApprove(dilemmaId: number) {
    const dilemma = await Dilemma.findOrFail(dilemmaId)

    await dilemma.load('propositions', (query) => query.select(['id']))

    dilemma.isApproved = !dilemma.isApproved

    Proposition.query()
      .whereIn(
        'id',
        dilemma.propositions.map((p) => p.id)
      )
      .update({ isApproved: dilemma.isApproved })
      .exec()

    await dilemma.save()

    return dilemma
  }
}
