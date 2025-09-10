const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blob.model')
const { blogsArray, blogsInDb } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let newBlog = new Blog(blogsArray[0])
  await newBlog.save()
  newBlog = new Blog(blogsArray[1])
  await newBlog.save()
})

describe('getting data when some blogs are present in db', () => {
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
})

describe('addition of new blog', async () => {
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

    const blogsAtEnd = await blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsArray.length + 1)
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

  test('fails with status code 400 if data invalid', async () => {
    const newBlog = {
      author: 'macha',
      url: 'http://www.u.arizona.edu/~rubinson/cotions/Go_To_Considered_Harmful.html',
      likes: 2,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
    const blogsAtEnd = await blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsArray.length)
  })
})

describe('deletion of blog', async () => {
  test('deletion of blog when id is valid', async () => {
    const initialBlogs = await blogsInDb()
    const blogToDelete = initialBlogs[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blobsAfterDeletion = await blogsInDb()
    assert.strictEqual(blobsAfterDeletion.length, initialBlogs.length - 1)
  })
})

describe('updating of blog', async () => {
  test('updating likes when id is valid', async () => {
    const initialBlogs = await blogsInDb()
    const blogToUpdate = initialBlogs[0]
    blogToUpdate.likes = 25
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(201)
    const blogsAfterUpdate = await blogsInDb()
    const updatedBlog = blogsAfterUpdate.find(
      (blog) => blogToUpdate.id === blog.id
    )
    assert.strictEqual(updatedBlog.likes, 25)
  })
})

after(async () => {
  await mongoose.connection.close()
})
