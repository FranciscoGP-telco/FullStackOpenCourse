/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
  })

  it('front page can be opened',  function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to the application')
    cy.contains('username')
  })

})