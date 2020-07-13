/* global describe */
/* global cy */
/* global it */

describe('My First Test', function () {
  it('Visit my app', () => {
    cy.visit('localhost:3000')
  })

  it('Should click in a video link', () => {
    cy.get('[data-cy=song-2b49f28f-2463-0501-9421-716318e53af9]').click()
    cy.wait(5000)
    cy.get('.fa-play').click()
  })

  it('Should test for play/pause button toggle', () => {
    const activeStyle = 'rgb(234, 234, 234) none repeat scroll 0% 0% / auto padding-box border-box'

    cy.get('.fa-play').should('not.exist')
    cy.get('.fa-pause').should('exist')
    cy.get('[data-cy=song-2b49f28f-2463-0501-9421-716318e53af9]').should('have.attr', 'data-active', 'true')
    cy.get('[data-cy=song-2b49f28f-2463-0501-9421-716318e53af9]').should('have.css', 'background', activeStyle)
  })

  it('Should test for player control duration update', () => {
    cy.get('time').should('contain', '1:42')
  })

  it('should test for player progress bar', () => {
    cy.wait(1000)
    cy.get('progress').should('not.have.value', 0)
  })
})
