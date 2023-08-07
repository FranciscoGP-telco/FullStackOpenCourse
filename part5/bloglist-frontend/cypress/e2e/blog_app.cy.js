/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user =   {
      _id: '64b6c6aec8567600846f4ff7',
      username: 'pakoska',
      password: '$2b$10$UQmmsgTaCWIiv6lGQwqUZua6zgwoVn9ffgAQYkZTG7Ah6ofl.Q7NW',
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
})

describe('Login', function() {
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