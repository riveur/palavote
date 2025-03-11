import router from '@adonisjs/core/services/router'

router.get('/', ({ response }) => response.ok({ message: 'Hello world' }))
