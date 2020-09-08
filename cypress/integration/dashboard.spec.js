describe('Dashboard', () => {
    beforeEach(function() {
        cy.login()
    })

    it('Shows the dashboard', () => {
        cy.visit('/dashboard')
        cy.get('h1').contains("Dashboard")
    })

    it("should pass the audits", function () {
        cy.visit('/dashboard')
        cy.lighthouse()
    })
})
