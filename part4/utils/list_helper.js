const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce(
    (fav, blog) => (blog.likes > (fav.likes || 0) ? blog : fav),
    blogs[0]
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const newBlog = blogs.reduce(
    (mblog, blog) => (blog.noOfBlog > (mblog.noOfBlog || 0) ? blog : mblog),
    blogs[0]
  )
  return { author: newBlog.author, blogs: newBlog.noOfBlog }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const newBlog = blogs.reduce(
    (likedBlog, blog) =>
      blog.likes > (likedBlog.likes || 0) ? blog : likedBlog,
    blogs[0]
  )
  return { author: newBlog.author, likes: newBlog.likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
