import router from '@adonisjs/core/services/router'

import '#auth/routes'

router.get('/', ({ response }) => response.ok({ message: 'Hello world' }))
