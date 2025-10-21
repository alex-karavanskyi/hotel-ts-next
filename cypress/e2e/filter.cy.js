describe('Product filtering and search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.wait(1000)
  })

  it('filters products by text search', () => {
    cy.get('[data-cy=search]').type('dell')
    cy.get('[data-cy=product-item]').should('have.length', 2)
    cy.get('[data-cy=product-item]').first().should('contain', 'Dell Monitor')
  })

  it('filters products by category', () => {
    cy.get('[data-cy=category]').select('laptops')
    cy.get('[data-cy=product-item]').should('have.length', 4)
    cy.get('[data-cy=product-item]').first().should('contain', 'HP Laptop')
  })

  it('shows "no results" message if nothing matches', () => {
    cy.get('[data-cy=search]').type('Sorry, no products matched your search...')
    cy.get('[data-cy=no-results]').should('be.visible')
  })
})
