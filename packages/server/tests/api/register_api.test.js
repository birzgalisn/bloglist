const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../../utils/test_helpers/test_helper')
const app = require('../../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../../models/user')

describe('when there is initially one user in db', () => {
  beforeAll(async () => {
    let passwordHash = await bcrypt.hash('secret', 10)
    let user = new User({ username: 'test', passwordHash })
    await user.save()
  })

  it('creation succeeds with a fresh username', async () => {
    let usersAtStart = await helper.usersInDb()

    let newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/register')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    let usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    let usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  it('creation fails with proper statuscode and message if username already taken', async () => {
    let usersAtStart = await helper.usersInDb()

    let newUser = {
      username: 'test',
      password: 'test',
    }

    let result = await api
      .post('/api/register')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    let usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
