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

test('if url or title is missing, we recieve a 400', async () => {
  const blogWithoutTitle = {
    author: 'Francisco Garcia',
    url: '/Firmware_16.0_has_been_published_for_Nintendo_Switch',
    likes: 5
  }
  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  const blogWithoutAuthor = {
    title: 'Firmware 16.0 has been published for Nintendo Switch',
    url: '/Firmware_16.0_has_been_published_for_Nintendo_Switch',
    likes: 5
  }
  await api
    .post('/api/blogs')
    .send(blogWithoutAuthor)
    .expect(400)

  const blogWithoutAuthorAndTitle = {
    url: '/Firmware_16.0_has_been_published_for_Nintendo_Switch',
    likes: 5
  }
  await api
    .post('/api/blogs')
    .send(blogWithoutAuthorAndTitle)
    .expect(400)
})

describe('deleting a post', () => {
  test('Check if we recieve a code 204 after deleting, id is not in DB and the number of post reduced by 1', async () => {
    const blogAtBeginning = await helper.blogsInDb()
    const blogToDelete = blogAtBeginning[0]

    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .expect(204)

    const blogsAfterDeleting = await helper.blogsInDb()

    expect(blogsAfterDeleting).toHaveLength(helper.initialBlogs.length - 1)

    const ids = blogsAfterDeleting.map(b => b._id)

    expect(ids).not.toContain(blogToDelete.id)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})