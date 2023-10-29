
import { gql } from '@apollo/client'


export const ALL_BOOKS = gql`
query AllBooks {
  allBooks {
    title
    author
    published
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ADD_BOOK = gql`
mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    author
    genres
    published
    title
  }
}`