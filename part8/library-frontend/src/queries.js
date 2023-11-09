
import { gql } from '@apollo/client'


export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      author {
        name
      }
      genres
      published
      title
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
  }
`

export const EDIT_BIRTHYEAR = gql`
  mutation EditAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      id
    }
  }
`