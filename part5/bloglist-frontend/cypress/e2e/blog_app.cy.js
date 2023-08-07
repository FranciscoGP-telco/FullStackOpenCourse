/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user =   {
      _id: '64b6c6aec8567600846f4ff7',
      username: 'pakoska',
      password: '1234',
      name: 'Francisco Garcia',
      __v: 0
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Log in to the application')
    cy.contains('username')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#Username').type('pakoska')
      cy.get('#Password').type('1234')
      cy.get('#login-button').click()

      cy.get('.logged').contains('Francisco Garcia is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#Username').type('pakito')
      cy.get('#Password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('User or Password incorrect')
    })
  })

  describe('When logged in', function() {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user =   {
        _id: '64b6c6aec8567600846f4ff7',
        username: 'pakoska',
        password: '1234',
        name: 'Francisco Garcia',
        __v: 0
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'pakoska', password: '1234' })
      cy.addBlog({
        title: 'React patterns',
        author: 'Francisco Garcia',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: '64b6c6aec8567600846f4ff7'
      })
      cy.addBlog({
        title: 'Go To Statement Considered Harmful',
        author: 'Francisco Garcia',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 7,
        user: '64b6c6aec8567600846f4ff7'
      })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function() {
      cy.get('#Username').type('pakoska')
      cy.get('#Password').type('1234')
      cy.get('#login-button').click()

      cy.contains('New blog').click()

      cy.get('#Title').type('Type wars')
      cy.get('#Author').type('Francisco Garcia')
      cy.get('#Url').type('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')

      cy.contains('create').click()

      cy.get('.operation').contains('A new blog')
    })
  })
})
