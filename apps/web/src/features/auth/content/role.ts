import type { User } from '../types'

export function translateRole(role: User['role']) {
  switch (role) {
    case 'USER':
      return 'Utilisateur'
    case 'ADMIN':
      return 'Administrateur'
    default:
      return 'Inconnu'
  }
}
