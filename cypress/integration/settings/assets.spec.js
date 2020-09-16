describe('Settings → Assets', () => {
    beforeEach(function() {
        cy.login()
    })

    it("Assets should pass the audits", function () {
        cy.visit('/settings/assets')
        cy.runAudit()
    })

    it("Image Transforms should pass the audits", function () {
        cy.visit('/settings/assets/transforms')
        cy.runAudit()
    })

    it("Settings should pass the audits", function () {
        cy.visit('/settings/assets/settings')
        cy.runAudit()
    })
})
