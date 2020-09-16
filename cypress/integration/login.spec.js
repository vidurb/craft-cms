describe('Login', () => {
    it("should pass the audits", function () {
        cy.visit('/')
        cy.runAudit()
    })

    // it('Log into the Control Panel', () => {
    //     cy.login()
    //     cy.visit('/dashboard')
    //     cy.get('h1').contains("Dashboard")
    // })
})
