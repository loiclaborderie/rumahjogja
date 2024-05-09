/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const PropertiesController = () => import('#controllers/properties_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/register', [UsersController, 'register'])
router.post('/login', [UsersController, 'login'])
router.post('/property/create', [PropertiesController, 'create']).use(middleware.auth())
router.get('/user/properties', [UsersController, 'getUserProperties']).use(middleware.auth())
