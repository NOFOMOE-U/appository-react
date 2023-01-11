describe('ui-shared: SharedUi component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sharedui--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to SharedUi!');
    });
});
