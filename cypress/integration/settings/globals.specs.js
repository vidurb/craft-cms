describe('Settings → Globals', () => {
    beforeEach(function() {
        cy.login()
    })

    it("Globals should pass the audits", function () {
        cy.visit('/settings/globals')
        cy.runAudit()
    })

    it("Create a new global set should pass the audits", function () {
        cy.visit('/settings/globals/new')
        cy.runAudit()
    })
})
