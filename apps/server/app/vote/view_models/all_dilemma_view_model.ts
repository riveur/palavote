import { UserInfoViewModel } from '#auth/view_models/user_info_view_model'
import Dilemma from '#vote/models/dilemma'

export class AllDilemmaViewModel {
  constructor(private dilemmas: Dilemma[]) {}

  static fromModel(dilemmas: Dilemma[]) {
    return new this(dilemmas)
  }

  serialize() {
    return this.dilemmas.map((dilemma) => ({
      id: dilemma.id,
      title: dilemma.title,
      isApproved: dilemma.isApproved,
      anonymousUsername: dilemma.anonymousUsername,
      author: dilemma.author ? UserInfoViewModel.fromModel(dilemma.author).serialize() : null,
      propositions: dilemma.propositions.map((prop) => ({
        id: prop.id,
        name: prop.name,
        slug: prop.slug,
        imageUrl: prop.imageUrl,
        votes: prop.votes.map((vote) => ({
          id: vote.id,
          voter: vote.userId || vote.anonymousUsername,
        })),
      })),
      createdAt: dilemma.createdAt.toISO()!,
      updatedAt: dilemma.updatedAt.toISO()!,
    }))
  }
}
