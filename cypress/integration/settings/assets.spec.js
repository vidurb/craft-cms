describe('Settings → Assets', () => {
    beforeEach(function() {
        cy.login('admin', 'password')
    })

    it("Assets should pass the audits", function () {
        cy.visit('/settings/assets')
        cy.lighthouse()
    })

    it("Image Transforms should pass the audits", function () {
        cy.visit('/settings/assets/transforms')
        cy.lighthouse()
    })

    it("Settings should pass the audits", function () {
        cy.visit('/settings/assets/settings')
        cy.lighthouse()
    })
})
