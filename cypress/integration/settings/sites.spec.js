describe('Settings → Sites', () => {
    beforeEach(function() {
        cy.login()
    })

    it("Sites should pass the audits", function () {
        cy.visit('/settings/sites')
        cy.runAudit()
    })

    it("Create a new site should pass the audits", function () {
        cy.visit('/settings/sites/new')
        cy.runAudit()
    })
})
