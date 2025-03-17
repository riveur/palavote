import Dilemma from '#vote/models/dilemma'
import Vote from '#vote/models/vote'

export class DilemmaRepository {
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

  async findAll() {
    return Dilemma.query()
      .preload('author')
      .preload('propositions', (query) => {
        query.preload('votes')
      })
      .where('is_approved', true)
      .orderBy('created_at', 'desc')
  }
}
