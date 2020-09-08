describe('Settings → Plugins', () => {
    beforeEach(function() {
        cy.login()
    })

    it("Plugins should pass the audits", function () {
        cy.visit('/settings/plugins')
        cy.lighthouse()
    })
})
