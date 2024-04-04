import { test } from '@japa/runner'
import { assert } from 'console'

test.group('Users', () => {
  var newUserId = 0
  test('Validate User List is not blank', async ({ client }) => {
    //1.- [GET] /users
    //assert http code 20x
    //assert response.results.lenght > 0
    const response = await client.get('/api/v1/Users/Pagination/1')
    response.assertStatus(200)
    assert(response.body().data.length > 0)
  })

  test('User by Id', async ({ client }) => {
    //2.- [GET] /users/<id>
    //assert http code 20x
    //assert response.id == <id>
    const idSelected = 1
    const response = await client.get('/api/v1/Users/' + idSelected)
    response.assertStatus(200)
    assert(response.body().id == idSelected)
  })

  test('User not found', async ({ client }) => {
    //2.1- [GET]/users/<id>
    //assert http code 404
    //assert response.message == "mi mensaje de error"
    const idSelected = 100
    const response = await client.get('/api/v1/Users/' + idSelected)
    response.assertStatus(404)
    assert(response.body().message == "User doesn't exist.")
  })

  test('Create User Correct', async ({ client }) => {
    //3.- [POST] /users
    //assert http code 20x
    //assert response.message == "mi mensaje de respuesta"
    //assert response.id > 0
    const response = await client
    .post('/api/v1/Users')
    .json({
      fullName : "Prueba",
      email: "Prueba@gmail.com",
      password: "Prueba1"
    })
    
    response.assertStatus(201)
    newUserId = response.body().user.id
    assert(response.body().message == "User created")
  })

  test('Create User Incorrect', async ({ client }) => {
    //3.1- [POST] /users
    //assert http code 400
    //assert response.message == "mi mensaje para el campo que esta mal"
    const response = await client
    .post('/api/v1/Users')
    .json({
      fullNamea : "David",
      emails: "david@gmail.com",
      passworda: "Prueba1"
     })
     
     response.assertStatus(400)
     var res = response.body().errors
     
    for (let index = 0; index < res.length; index++) {
      const element = res[index];
      console.log("  " + element.message)
    }
  })

  test('Update User Correct', async ({ client }) => {
    //4.- [UPDATE] | [PUT] | [PATCH] /users/<id>
    //assert http code 20x
    //assert response.email == new_email
    //assert response.message == "mi mensaje de respuesta"
    var newEmail = 'ubaldo2@gmail.com'
    const response = await client
    .put('/api/v1/Users/1')
    .json({
      fullName : 'Ubaldo Luna',
      email: newEmail,
      password: 'Prueba1'
     })
    response.assertStatus(201)
    assert(response.body().message == "User updated")
    assert(response.body().user.email == newEmail)
  })

  test('Update User Not Correct', async ({ client }) => {
    //4.1- [UPDATE] /users/<id>
    //assert http code 404
    //assert response.message == "mi mensaje de respuesta"
    var newEmail = 'Prueba@gmail.com'
    const response = await client
    .put('/api/v1/Users/1')
    .json({
      fullName : 'Ubaldo Luna',
      email: newEmail,
      password: 'Prueba1'
     })
    response.assertStatus(404)
    assert(response.body().message == "User not updated")
  })

  test('Delete User Correct', async ({ client }) => {
    //5.- [DELETE] /users/<id>
    //assert http code 20x
    //assert response.message == "mi mensaje de respuesta"
    const response = await client
    .delete('/api/v1/Users/' + newUserId)
    response.assertStatus(202)
    assert(response.body().message == "User deleted")
  })

  test('Delete User Not Correct', async ({ client }) => {
    //5.1.- [DELETE] /users/<id>
    //assert http code 404
    //assert response.message == "mi mensaje de respuesta"
    const response = await client
    .delete('/api/v1/Users/' + newUserId)
    response.assertStatus(404)
    assert(response.body().message == "User doesn't exist.")
  })

})