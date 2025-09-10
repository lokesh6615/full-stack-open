const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blob.model')

const api = supertest(app)

const blogsArray = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let newBlog = new Blog(blogsArray[0])
  await newBlog.save()
  newBlog = new Blog(blogsArray[1])
  await newBlog.save()
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, blogsArray.length)
})

test('blogs contain unique id field', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach((blog) => {
    assert.ok(blog.id, 'Blog is missing id field')
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'controlled minds',
    author: 'macha',
    url: 'http://www.u.arizona.edu/~rubinson/cotions/Go_To_Considered_Harmful.html',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')
  assert.strictEqual(blogsAtEnd.body.length, blogsArray.length + 1)
})

test('likes value is 0 if not provided in request', async () => {
  const newBlog = {
    title: 'controlled minds',
    author: 'macha',
    url: 'http://www.u.arizona.edu/~rubinson/cotions/Go_To_Considered_Harmful.html',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogsAtEnd = response.body
  const insertedBlog = blogsAtEnd[blogsAtEnd.length - 1]
  assert.strictEqual(insertedBlog.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})
