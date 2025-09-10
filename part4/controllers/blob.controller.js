const blobRouter = require('express').Router()
const Blog = require('../models/blob.model')
blobRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blobRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((error) => {
      console.log('Error while inserting record in db', error)
      response.status(400).json({ error: error.message })
    })
})

blobRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blobRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const { likes } = request.body
  Blog.findById(id)
    .then((blog) => {
      if (!blog) {
        return response.status(404).end()
      }

      blog.likes = likes
      return blog.save().then((updatedBlog) => {
        response.status(201).json(updatedBlog)
      })
    })
    .catch((error) => next(error))
})

module.exports = blobRouter
