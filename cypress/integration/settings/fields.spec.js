describe('Settings → Fields', () => {
    beforeEach(function() {
        cy.login()
    })

    it("Fields should pass the audits", function () {
        cy.visit('/settings/fields')
        cy.runAudit()
    })

    it("Create a new field should pass the audits", function () {
        cy.visit('/settings/fields/new')
        cy.runAudit()
    })
})
