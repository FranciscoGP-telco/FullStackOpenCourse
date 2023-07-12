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

  console.log(blogToCheck._id)

  const resultBlog = await api
    .get(`/api/blogs/${blogToCheck._id}`)

  expect(resultBlog.body._id).toBeDefined()
})
afterAll(async () => {
  await mongoose.connection.close()
})