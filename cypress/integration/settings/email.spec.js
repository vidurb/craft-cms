describe('Settings → Email', () => {
    beforeEach(function() {
        cy.login('admin', 'password')
    })

    it("Email should pass the audits", function () {
        cy.visit('/settings/email')
        cy.lighthouse()
    })
})
