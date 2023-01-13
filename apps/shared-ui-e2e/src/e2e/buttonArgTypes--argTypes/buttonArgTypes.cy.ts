describe('shared-ui: argTypes component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=argtypes--primary'))

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to argTypes!')
  })
})
