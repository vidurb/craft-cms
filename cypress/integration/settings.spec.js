describe('Settings', () => {
    beforeEach(function() {
        cy.login('admin', 'password')
    })

    it("Settings should pass the audits", function () {
        cy.visit('/settings')
        cy.lighthouse()
    })
})
