import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import {
  createUserValidator,
  updateUserValidator
} from '#validators/user'

export default class UsersController {

  async get({params, response}: HttpContext) {
    try {
      const page = params.page || 1
      const pageSize = 5

      const user = await User.query()
        .paginate(page, pageSize)

      // Devuelve los resultados paginados
      return user
    } catch (error) {
      return response.status(404).send({ message: 'No users found' });
    }
  }

  async getUserById({params, response}: HttpContext) {
    try {
      const user = await User.findBy('id', params.id);
      if (!user) {
        return response.status(404).send({ message: "User doesn't exist." });
      }
      return user;
    } catch (error) {
      return response.status(404).send({ message: error.messages });
    }
  }

  async create({request, response}: HttpContext) {
    try {
      const requestBody = request.body();
      const user = new User()
      await createUserValidator.validate(requestBody)
      user.fullName = request.input('fullName')
      user.email = request.input('email')
      user.password = request.input('password')

      await user.save()
      return response.json({message: 'User created', code: 201})
    } catch (error) {
      return response.status(400).send({ errors: error.messages });
    }
  }

  async update({params, request, response}: HttpContext) {
    try {
      const requestBody = request.body();
      await updateUserValidator.validate(requestBody)
      const user = await User.query().where('id', params.id).first();
      if (!user) {
        return response.status(404).send({ message: "User doesn't exist." });
      }
      user.merge(requestBody)
      await user.save()
      return response.json({message: 'User actualizado', code: 200})
    } catch (error) {
      return response.status(404).send({ errors: error.messages });
    }
  }

  async destroy({ params, response }: HttpContext) {
    try{
      const user = await User.query().where('id', params.id).first();
      if (!user) {
        return response.status(404).send({ message: "User doesn't exist." });
      }

      await user.delete()
      return response.json({message: 'User deleted', code: 202})
    } catch (error){
      return response.status(404).send({ errors: error.messages });
    }
  }

}
