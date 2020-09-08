describe('Settings → Sections', () => {
    beforeEach(function() {
        cy.login()
    })

    it("Sections should pass the audits", function () {
        cy.visit('/settings/sections')
        cy.lighthouse()
    })

    it("Create a new section should pass the audits", function () {
        cy.visit('/settings/sections/new')
        cy.lighthouse()
    })
})
