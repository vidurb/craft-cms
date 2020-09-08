describe('Settings → Fields', () => {
    beforeEach(function() {
        cy.login()
    })

    it("Fields should pass the audits", function () {
        cy.visit('/settings/fields')
        cy.lighthouse()
    })

    it("Create a new field should pass the audits", function () {
        cy.visit('/settings/fields/new')
        cy.lighthouse()
    })
})
