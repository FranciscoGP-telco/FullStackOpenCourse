const _ = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (mostLikedBlog, blog) => {
    let likes = 0
    likes = mostLikedBlog ? mostLikedBlog.likes : 0
    return (likes > blog.likes) ? mostLikedBlog : blog
  }

  return blogs.reduce(reducer, null)
}

const mostBlogs = (blogs) => {
  const arrayGrouped = _
    .map(_.
      countBy(blogs, 'author'), (total, author) => (
      {
        author: author,
        total: total
      }
    ))

  const arrayOrdered = _
    .orderBy(arrayGrouped, 'total', 'desc')

  console.log(arrayOrdered)
  return arrayOrdered[0]
}

const mostLikes = (blogs) => {
  const arrayGrouped = _(blogs)
    .groupBy('author')
    .map((blog, author) => ({
      author: author,
      likes: _.sumBy(blog, 'likes')
    }))
    .value()

  const arrayOrdered = _
    .orderBy(arrayGrouped, 'likes', 'desc')

  console.log(arrayGrouped)

  return arrayOrdered[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}