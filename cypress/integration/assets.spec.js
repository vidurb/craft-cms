describe('Assets', () => {
    beforeEach(function() {
        cy.login('admin', 'password')
    })

    it('shows the Assets index', () => {
        cy.visit('/assets')
        cy.get('h1').contains("Assets")
    })

    it("should pass the audits", function () {
        cy.visit('/assets')
        cy.lighthouse()
    })
})
