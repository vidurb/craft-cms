describe('Settings → Routes', () => {
    beforeEach(function() {
        cy.login()
    })

    it("Routes should pass the audits", function () {
        cy.visit('/settings/routes')
        cy.lighthouse()
    })
})
