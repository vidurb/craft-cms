describe('Entries', () => {
    beforeEach(function() {
        cy.login('admin', 'password')
    })

    it('shows the Entries index', () => {
        cy.visit('/entries')
        cy.get('h1').contains("Entries")
    })

    it("should pass the audits", function () {
        cy.visit('/entries')
        cy.lighthouse()
    })
})
