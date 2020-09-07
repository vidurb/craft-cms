describe('Utilities', () => {
    beforeEach(function() {
        cy.login('admin', 'password')
    })

    it("Updates should pass the audits", function () {
        cy.visit('/utilities/updates')
        cy.lighthouse()
    })

    it("System Report should pass the audits", function () {
        cy.visit('/utilities/system-report')
        cy.lighthouse()
    })

    it("Project Config should pass the audits", function () {
        cy.visit('/utilities/project-config')
        cy.lighthouse()
    })

    it("PHP Info should pass the audits", function () {
        cy.visit('/utilities/php-info')
        cy.lighthouse()
    })

    it("System Messages should pass the audits", function () {
        cy.visit('/utilities/system-messages')
        cy.lighthouse()
    })

    it("Queue Manager should pass the audits", function () {
        cy.visit('/utilities/queue-manager')
        cy.lighthouse()
    })

    it("Caches should pass the audits", function () {
        cy.visit('/utilities/clear-caches')
        cy.lighthouse()
    })

    it("Deprecation Warnings should pass the audits", function () {
        cy.visit('/utilities/deprecation-errors')
        cy.lighthouse()
    })

    it("Database Backup should pass the audits", function () {
        cy.visit('/utilities/db-backup')
        cy.lighthouse()
    })

    it("Find and Replace Backup should pass the audits", function () {
        cy.visit('/utilities/find-replace')
        cy.lighthouse()
    })

    it("Migrations should pass the audits", function () {
        cy.visit('/utilities/migrations')
        cy.lighthouse()
    })
})
