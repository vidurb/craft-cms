describe('Categories', () => {
    beforeEach(function() {
        cy.login()
    })

    it('shows the Categories index', () => {
        cy.visit('/categories')
        cy.get('h1').contains("Categories")
    })

    it("should pass the audits", function () {
        cy.visit('/categories')
        cy.runAudit()
    })
})
