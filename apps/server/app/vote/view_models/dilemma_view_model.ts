import { UserInfoViewModel } from '#auth/view_models/user_info_view_model'
import Dilemma from '#vote/models/dilemma'

export class DilemmaViewModel {
  constructor(private dilemma: Dilemma) {}

  static fromModel(dilemma: Dilemma) {
    return new this(dilemma)
  }

  serialize() {
    return {
      id: this.dilemma.id,
      title: this.dilemma.title,
      anonymousUsername: this.dilemma.anonymousUsername,
      author: this.dilemma.author
        ? UserInfoViewModel.fromModel(this.dilemma.author).serialize()
        : null,
      propositions: this.dilemma.propositions.map((prop) => ({
        id: prop.id,
        name: prop.name,
        slug: prop.slug,
        imageUrl: prop.imageUrl,
      })),
      createdAt: this.dilemma.createdAt.toISO()!,
      updatedAt: this.dilemma.updatedAt.toISO()!,
    }
  }
}
