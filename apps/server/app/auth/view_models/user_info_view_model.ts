import User from '#auth/models/user'

export class UserInfoViewModel {
  constructor(private user: User) {}

  static fromModel(user: User) {
    return new this(user)
  }

  serialize() {
    return {
      id: this.user.id,
      username: this.user.username,
      avatarUrl: this.user.avatarUrl
        ? this.user.avatarUrl
        : `https://api.dicebear.com/9.x/initials/svg?seed=${this.user.username}`,
      role: this.user.role,
      createdAt: this.user.createdAt.toISO()!,
      updatedAt: this.user.updatedAt ? this.user.updatedAt?.toISO()! : null,
    }
  }
}
