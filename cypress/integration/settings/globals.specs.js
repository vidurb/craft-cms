describe('Settings → Globals', () => {
    beforeEach(function() {
        cy.login('admin', 'password')
    })

    it("Globals should pass the audits", function () {
        cy.visit('/settings/globals')
        cy.lighthouse()
    })

    it("Create a new global set should pass the audits", function () {
        cy.visit('/settings/globals/new')
        cy.lighthouse()
    })
})
