describe('Settings → Plugins', () => {
    beforeEach(function() {
        cy.login('admin', 'password')
    })

    it("Plugins should pass the audits", function () {
        cy.visit('/settings/plugins')
        cy.lighthouse()
    })
})
