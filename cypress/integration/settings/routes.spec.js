describe('Settings → Routes', () => {
    beforeEach(function() {
        cy.login('admin', 'password')
    })

    it("Routes should pass the audits", function () {
        cy.visit('/settings/routes')
        cy.lighthouse()
    })
})
