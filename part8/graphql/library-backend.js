const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
var ObjectId = require('mongoose').Types.ObjectId
mongoose.set('strictQuery', false)
require('dotenv').config()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    getBooks(author: String, genre: String): [Book!]!
    allBooks: [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book

   addAuthor(
      name: String!
      born: Int
      bookCount: Int
   ): Author

   editAuthor(
    name: String!
    born: Int!
   ): Author

   createUser(
    username: String!
    favoriteGenre: String!
   ): User

   login(
    username: String!
    password: String!
   ): Token
  }
`
const createAuthor = async (args) => {
  try{
    bookAuthor = new Author({
      name: args.author || args.name,
      born: args.born
    })
    await bookAuthor.save()
  } catch (error) {
    throw new GraphQLError('Saving author error', {
    extensions: {
      code: 'BAD_USER_INPUT',
      invalidArgs: authorName,
      error
    }
    })
  }
  return bookAuthor
}

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async () => Book.find({}),
    getBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      const listOfBooks =  Book.find({ author: new ObjectId(author._id) })
      if(args.genre){
        return listOfBooks.find({ genres: args.genre })
      }
      return listOfBooks
    },
    allAuthors: async () => Author.find(),
    me: (root, args, context ) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      const listOfBooks =  Book.find({ author: new ObjectId(author._id) })
      return listOfBooks.countDocuments()
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if(!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      let bookAuthor = await Author.findOne({name: args.author })
      if(!bookAuthor){
        bookAuthor = await createAuthor(args)
      }
      const book = new Book({ ...args, author: bookAuthor })
      try{
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book error', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return book
    },
    addAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if(!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const author = await createAuthor(args)
      return author
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if(!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      
      const author = await Author.findOne( { name: args.name} )
      if (!author) {
        return null
      }
      author.born = args.born
      try{
        await author.save()
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Editing year failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.born,
            error
          }
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret') {
        throw new GraphQLError('error with the credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ( { req, res } ) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
