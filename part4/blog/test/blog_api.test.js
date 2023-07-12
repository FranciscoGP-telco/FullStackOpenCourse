const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs comes in json format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
})

test('we can get all the blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('The unique identifier is called id', async () => {
  const startingBlogs = await helper.blogsInDb()
  const blogToCheck = startingBlogs[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToCheck._id}`)

  expect(resultBlog.body._id).toBeDefined()
})

test('A blog can be added by POST', async () => {
  const blog = {
    title: 'Firmware 16.0 has been published for Nintendo Switch',
    author: 'Francisco Garcia',
    url: '/Firmware_16.0_has_been_published_for_Nintendo_Switch',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogs.map(b => b.title)
  expect(titles).toContain(
    'Firmware 16.0 has been published for Nintendo Switch'
  )
})

test('if a blog doesnt have the number of post, it will set to 0', async () => {
  const blog = {
    title: 'Firmware 16.0 has been published for Nintendo Switch',
    author: 'Francisco Garcia',
    url: '/Firmware_16.0_has_been_published_for_Nintendo_Switch'
  }

  console.log('blog', blog)
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  const likes = blogs.map(b => b.likes)
  expect(likes.at(-1)).toBe(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})