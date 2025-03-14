import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const LogoutController = () => import('#auth/controllers/logout_controller')
const AnonymousController = () => import('#auth/controllers/anonymous_controller')
const DiscordController = () => import('#auth/controllers/discord_controller')
const UserInfoController = () => import('#auth/controllers/user_info_controller')

router
  .group(() => {
    router.get('/me', [UserInfoController, 'me']).middleware(middleware.auth({ guards: ['api'] }))
    router.get('/redirect', [DiscordController, 'redirect'])
    router.get('/callback', [DiscordController, 'callback'])
    router.post('/anonymous', [AnonymousController, 'execute'])
    router
      .post('/logout', [LogoutController, 'execute'])
      .middleware(middleware.auth({ guards: ['api'] }))
  })
  .prefix('/auth')
