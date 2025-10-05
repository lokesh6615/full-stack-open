const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user.model')
const mongoose = require('mongoose')

const api = supertest(app)

describe('user creation', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
      username: 'root',
      passwordHash: 'de4r5678uijnbvfr',
    })
    await user.save()
  })
  test('creation fails if username is missing', async () => {
    const newUser = { name: 'random name', password: 'password123' }
    const result = await api.post('/api/users').send(newUser).expect(400)
    assert.ok(result.body.error.includes('username and password are required'))
  })

  test('creation fails if password is missing', async () => {
    const newUser = { username: 'random username', name: 'random name' }
    const result = await api.post('/api/users').send(newUser).expect(400)
    assert.ok(result.body.error.includes('username and password are required'))
  })

  test('creation fails if username and password is less than length 3', async () => {
    const newUser1 = { username: 'ab', name: 'maharaj', password: 'password' }
    const newUser2 = {
      username: 'validuser',
      name: 'maharaj',
      password: 'pw',
    }
    const result1 = await api.post('/api/users').send(newUser1).expect(400)
    const result2 = await api.post('/api/users').send(newUser2).expect(400)
    assert.ok(
      result1.body.error.includes(
        'username and password must be at least 3 characters long'
      )
    )
    assert.ok(
      result2.body.error.includes(
        'username and password must be at least 3 characters long'
      )
    )
  })
  test('creation fails if username already exist', async () => {
    const newUser = { username: 'root', name: 'Duplicate', password: 'secret' }
    const result = await api.post('/api/users').send(newUser).expect(400)
    assert.ok(result.body.error.includes('exist'))
  })
})

after(async () => {
  await mongoose.connection.close()
})
