const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}

      if (args.author) {
        let existingAuthor = await Author.findOne({ name: args.author })
        if (!existingAuthor) return []
        filter.author = existingAuthor._id
      }

      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }
      return await Book.find(filter).populate('author')
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const bookCounts = await Book.aggregate([
        { $group: { _id: '$author', count: { $sum: 1 } } },
      ])

      const countMap = {}
      bookCounts.forEach((entry) => {
        countMap[entry._id.toString()] = entry.count
      })

      return authors.map((a) => ({
        ...a.toObject(),
        bookCount: countMap[a._id.toString()] || 0,
      }))
    },

    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      const { title, author, published, genres } = args
      if (title.length < 3 || author.length < 3) {
        throw new GraphQLError('Input too short', {
          extensions: { code: 'INVALID_INPUT' },
        })
      }
      let existingAuthor = await Author.findOne({ name: author })
      if (!existingAuthor) {
        existingAuthor = new Author({ name: author })
        await existingAuthor.save()
      }
      const book = new Book({
        title,
        published,
        author: existingAuthor._id,
        genres,
      })
      try {
        const returned = await book.save()
        console.log(book)
        pubsub.publish('BOOK_ADDED', { bookAdded: returned.populate('author') })
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }

      return book.populate('author')
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      const authorToEdit = await Author.findOne({ name: args.name })
      if (!authorToEdit) {
        throw new GraphQLError('Author to edit not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        })
      }
      authorToEdit.born = args.setBornTo
      try {
        await authorToEdit.save()
      } catch (error) {
        throw new GraphQLError('adding born failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
      return authorToEdit
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
