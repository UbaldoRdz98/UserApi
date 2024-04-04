import { test } from '@japa/runner'
import { assert } from 'console'

test.group('User List', () => {
  test('Validate User List is not blank', async ({ client }) => {
    //1.- [GET] /users
    //assert http code 20x
    //assert response.results.lenght > 0
    const response = await client.get('/api/v1/Users/Pagination/1')
    response.assertStatus(200)
    assert(response.body().data.length > 0)
  })
})

test.group('User by Id', () => {
  test('Validate User Selected', async ({ client }) => {
    //2.- [GET] /users/<id>
    //assert http code 20x
    //assert response.id == <id>
    const idSelected = 1
    const response = await client.get('/api/v1/Users/' + idSelected)
    response.assertStatus(200)
    assert(response.body().id == idSelected)

  })
})
/* 
test.group('User not found', () => {
  test('Validate User Selected', async ({ client }) => {
    //2.1- [GET]/users/<id>
    //assert http code 404
    //assert response.message == "mi mensaje de error"
    const response = await client.get('/api/v1/Users/1')
    response.assertStatus(200)

  })
})

test('Post Corrected', async ({ client }) => {
  //3.- [POST] /users
  //assert http code 20x
  //assert response.message == "mi mensaje de respuesta"
  //assert response.id > 0
  const response = await client
  .post('/posts')
  .json({
    title: 'some title',
    body: 'some description',
  })

})

test('Post Fail', async ({ client }) => {
  //3.1- [POST] /users
  //assert http code 400
  //assert response.message == "mi mensaje para el campo que esta mal"
  const response = await client
  .post('/posts')
  .json({
    title: 'some title',
    body: 'some description',
  })

})




 */



