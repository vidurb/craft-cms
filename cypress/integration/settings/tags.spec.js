describe('Settings → Tags', () => {
    beforeEach(function() {
        cy.login()
    })

    it("Tag Groups should pass the audits", function () {
        cy.visit('/settings/tags')
        cy.lighthouse()
    })

    it("Create a new category group should pass the audits", function () {
        cy.visit('/settings/tags/new')
        cy.lighthouse()
    })
})
