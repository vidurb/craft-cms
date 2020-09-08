describe('Settings → Email', () => {
    beforeEach(function() {
        cy.login()
    })

    it("Email should pass the audits", function () {
        cy.visit('/settings/email')
        cy.lighthouse()
    })
})
