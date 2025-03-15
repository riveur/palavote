import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

const ShowDilemmaController = () => import('#vote/controllers/show_dilemma_controller')
const PickDilemmaController = () => import('#vote/controllers/pick_dilemma_controller')
const StoreDilemmaController = () => import('#vote/controllers/store_dilemma_controller')
const VoteDilemmaController = () => import('#vote/controllers/vote_dilemma_controller')

router
  .group(() => {
    router.post('/dilemmas/vote', [VoteDilemmaController, 'execute'])
    router.get('/dilemmas/pick', [PickDilemmaController, 'execute'])
    router.get('/dilemmas/:firstProp/:secondProp', [ShowDilemmaController, 'execute'])
    router.post('/dilemmas', [StoreDilemmaController, 'execute'])
  })
  .middleware(middleware.auth({ guards: ['api'] }))
