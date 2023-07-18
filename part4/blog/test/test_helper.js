const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const initialUsers = [
  {
    _id: '64b6c6aec8567600846f4ff7',
    username: 'pakoska',
    password: '$2b$10$UQmmsgTaCWIiv6lGQwqUZua6zgwoVn9ffgAQYkZTG7Ah6ofl.Q7NW',
    name: 'Francisco Garcia',
    __v: 0
  },
  {
    _id: '64b6c752c8567600846f4ffa',
    username: 'patripb',
    password: '$2b$10$rTKB8E4ssvoIX.1O/r11f.GiQlCo0e4HeGRmp5L7owmxRyWv0XT3W',
    name: 'Patricia Barcena',
    __v: 0
  }
]


const nonExistingId = async () => {
  const blog = new Blog({ title: 'toremove' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}