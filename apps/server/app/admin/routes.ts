import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

const ToggleDilemmaApproveController = () =>
  import('#admin/controllers/toggle_dilemma_approve_controller')
const UpdateDilemmaController = () => import('#admin/controllers/update_dilemma_controller')

router
  .group(() => {
    router.put('/dilemmas/:id/approve', [ToggleDilemmaApproveController, 'execute'])
    router.put('/dilemmas/:id', [UpdateDilemmaController, 'execute'])
  })
  .prefix('/api/admin')
  .middleware(middleware.auth({ guards: ['api'] }))
