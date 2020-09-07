describe('Settings → Users', () => {
    beforeEach(function() {
        cy.login('admin', 'password')
    })

    it("User Groups should pass the audits", function () {
        cy.visit('/settings/users')
        cy.lighthouse()
    })

    it("Create a new user group should pass the audits", function () {
        cy.visit('/settings/users/groups/new')
        cy.lighthouse()
    })

    it("Fields should pass the audits", function () {
        cy.visit('/settings/users/fields')
        cy.lighthouse()
    })

    it("Settings should pass the audits", function () {
        cy.visit('/settings/users/settings')
        cy.lighthouse()
    })
})
