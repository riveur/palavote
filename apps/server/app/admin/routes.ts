import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

const ToggleDilemmaApproveController = () =>
  import('#admin/controllers/toggle_dilemma_approve_controller')
const UpdateDilemmaController = () => import('#admin/controllers/update_dilemma_controller')
const ListUserController = () => import('#admin/controllers/list_user_controller')
const UpdateUserController = () => import('#admin/controllers/update_user_controller')

router
  .group(() => {
    router.put('/dilemmas/:id/approve', [ToggleDilemmaApproveController, 'execute'])
    router.put('/dilemmas/:id', [UpdateDilemmaController, 'execute'])
    router.get('/users', [ListUserController, 'execute'])
    router.put('/users/:id', [UpdateUserController, 'execute'])
  })
  .prefix('/api/admin')
  .middleware(middleware.auth({ guards: ['api'] }))
