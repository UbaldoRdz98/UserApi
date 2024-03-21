/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'

router.group(() => {
  router.get('Users/Pagination/:page', [UsersController, 'get'])
  router.get('Users/:id', [UsersController, 'getUserById'])
  router.post('Users', [UsersController, 'create'])
  router.put('Users/:id', [UsersController, 'update'])
  router.delete('Users/:id', [UsersController, 'destroy'])
}).prefix('/api/v1')

