describe('Plugin Store', () => {
    beforeEach(function() {
        cy.login('admin', 'password')
    })

    it('shows the Plugin Store index', () => {
        cy.visit('/plugin-store')
        cy.get('h1').contains("Plugin Store")
    })

    it("should pass the audits", function () {
        cy.visit('/plugin-store')
        cy.lighthouse()
    })
})
