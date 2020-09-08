describe('Settings → General', () => {
    beforeEach(function() {
        cy.login()
    })

    it("General should pass the audits", function () {
        cy.visit('/settings/general')
        cy.lighthouse()
    })
})
