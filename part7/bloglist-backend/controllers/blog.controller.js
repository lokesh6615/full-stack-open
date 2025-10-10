const blogRouter = require('express').Router()
const Blog = require('../models/blog.model')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  try {
    const blogData = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    })

    return response.json(blogData)
  } catch (error) {
    console.log('Error while fetching blobs from db', error)
    response.status(400).json({ error: error.message })
  }
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

    const populatedBlog = await savedBlog.populate('user', {
      username: 1,
      name: 1,
    })

    response.status(201).json(populatedBlog)
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
  try {
    const id = request.params.id
    const { likes } = request.body

    const blog = await Blog.findById(id)

    if (!blog) {
      return response.status(404).end()
    }

    blog.likes = likes
    const updatedBlog = await blog.save()

    const populatedBlog = await updatedBlog.populate('user', {
      username: 1,
      name: 1,
    })

    response.status(201).json(populatedBlog)
  } catch (error) {
    next(error)
  }
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

blogRouter.post('/:id/comments', async (request, response) => {
  try {
    const { comment } = request.body
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }
    blog.comments = blog.comments.concat(comment)
    const updatedBlog = await blog.save()
    const populatedBlog = await updatedBlog.populate('user', {
      username: 1,
      name: 1,
    })
    response.status(201).json(populatedBlog)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

module.exports = blogRouter
