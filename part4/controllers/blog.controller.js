const blogRouter = require('express').Router()
const Blog = require('../models/blog.model')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', (request, response) => {
  Blog.find({})
    .populate('user')
    .then((blogs) => {
      response.json(blogs)
    })
})

blogRouter.post('/', userExtractor, async (request, response) => {
  try {
    const user = request.user
    if (!user) {
      return response.status(400).json({ error: 'No user found' })
    }

    const blog = new Blog({ ...request.body, user: user.id })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    console.log('Error while inserting record in db', error)
    response.status(400).json({ error: error.message })
  }
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const blogToDelete = await Blog.findById(id)
  if (!blogToDelete) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  const user = request.user

  if (user.id.toString() !== blogToDelete.user.toString()) {
    return response.status(403).send({ error: 'Unautorised user for deletion' })
  }
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.put('/:id', userExtractor, async (request, response, next) => {
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

module.exports = blogRouter
