import Vote from '#vote/models/vote'

export class VoteRepository {
  async exists(userId: number, propositionId: number) {
    return (
      (await Vote.query()
        .where('user_id', userId)
        .andWhere('proposition_id', propositionId)
        .first()) !== null
    )
  }

  async vote(userId: number, propositionId: number) {
    return await Vote.create({
      userId: userId,
      propositionId: propositionId,
    })
  }

  async findVoteByUserId(userId: number, propositionIds: number[] = []) {
    const query = Vote.query().where('user_id', userId)

    if (propositionIds.length > 0) {
      query.whereIn('proposition_id', propositionIds)
    }

    return query.first()
  }
}
