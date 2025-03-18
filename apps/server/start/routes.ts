import router from '@adonisjs/core/services/router'

import '#admin/routes'
import '#auth/routes'
import '#vote/routes'

router.get('/', ({ response }) => response.ok({ message: 'Hello world' }))
