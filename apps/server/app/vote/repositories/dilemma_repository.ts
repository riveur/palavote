import Dilemma from '#vote/models/dilemma'
import Vote from '#vote/models/vote'

export class DilemmaRepository {
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
}
