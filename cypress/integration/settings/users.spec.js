describe('Settings → Users', () => {
    beforeEach(function() {
        cy.login()
    })

    it("User Groups should pass the audits", function () {
        cy.visit('/settings/users')
        cy.runAudit()
    })

    it("Create a new user group should pass the audits", function () {
        cy.visit('/settings/users/groups/new')
        cy.runAudit()
    })

    it("Fields should pass the audits", function () {
        cy.visit('/settings/users/fields')
        cy.runAudit()
    })

    it("Settings should pass the audits", function () {
        cy.visit('/settings/users/settings')
        cy.runAudit()
    })
})
