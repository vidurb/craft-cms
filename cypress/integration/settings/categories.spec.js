describe('Settings → Categories', () => {
    beforeEach(function() {
        cy.login()
    })

    it("Category Groups should pass the audits", function () {
        cy.visit('/settings/categories')
        cy.lighthouse()
    })

    it("Create a new category group should pass the audits", function () {
        cy.visit('/settings/categories/new')
        cy.lighthouse()
    })
})
