describe('Settings', () => {
    beforeEach(function() {
        cy.login()
    })

    it("Settings should pass the audits", function () {
        cy.visit('/settings')
        cy.runAudit()
    })
})
