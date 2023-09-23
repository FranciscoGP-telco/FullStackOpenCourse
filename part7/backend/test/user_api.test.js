const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('When we retrieve the users from the DB', () => {
  test('users comes in json format', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('we can get all the users', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('The password is not exported', async () => {
    const startingUsers = await helper.usersInDb()
    const firstUser = startingUsers[0]

    const resultUser = await api
      .get(`/api/users/${firstUser.id}`)

    expect(resultUser.body.password).not.toBeDefined()
  })

})

describe('When we create a user in the DB', () => {
  test('A user can be added. We recieve a 201, a json answer and the DB size increase', async () => {
    const user = {
      username: 'Pakoska2',
      password: '1234',
      name: 'Francisco Garcia2'
    }

    await api
      .post('/api/users/')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const users = await helper.usersInDb()
    expect(users).toHaveLength(helper.initialUsers.length + 1)

    const usernames = users.map(user => user.username)
    expect(usernames).toContain(
      'Pakoska2'
    )
  })

  test('We need to add a username and a password', async () => {
    const userWithoutPassword = {
      username: 'Pakoska2',
      name: 'Paquito Ská'
    }

    await api
      .post('/api/users/')
      .send(userWithoutPassword)
      .expect(400)

    const userWithoutUsername = {
      password: '1234',
      name: 'Paquito Ská'
    }

    await api
      .post('/api/users/')
      .send(userWithoutUsername)
      .expect(400)
  })

  test('The password length will be longer than 3 characterers', async () => {
    const userWithShortPassword = {
      username: 'Pakoska2',
      password: '12',
      name: 'Paquito Ská'
    }

    await api
      .post('/api/users/')
      .send(userWithShortPassword)
      .expect(400)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})