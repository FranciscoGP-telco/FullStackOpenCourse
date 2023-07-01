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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}