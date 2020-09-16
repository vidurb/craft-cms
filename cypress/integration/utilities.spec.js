describe('Utilities', () => {
    beforeEach(function() {
        cy.login()
    })

    it("Updates should pass the audits", function () {
        cy.visit('/utilities/updates')
        cy.runAudit()
    })

    it("System Report should pass the audits", function () {
        cy.visit('/utilities/system-report')
        cy.runAudit()
    })

    it("Project Config should pass the audits", function () {
        cy.visit('/utilities/project-config')
        cy.runAudit()
    })

    it("PHP Info should pass the audits", function () {
        cy.visit('/utilities/php-info')
        cy.runAudit()
    })

    it("System Messages should pass the audits", function () {
        cy.visit('/utilities/system-messages')
        cy.runAudit()
    })

    it("Queue Manager should pass the audits", function () {
        cy.visit('/utilities/queue-manager')
        cy.runAudit()
    })

    it("Caches should pass the audits", function () {
        cy.visit('/utilities/clear-caches')
        cy.runAudit()
    })

    it("Deprecation Warnings should pass the audits", function () {
        cy.visit('/utilities/deprecation-errors')
        cy.runAudit()
    })

    it("Database Backup should pass the audits", function () {
        cy.visit('/utilities/db-backup')
        cy.runAudit()
    })

    it("Find and Replace Backup should pass the audits", function () {
        cy.visit('/utilities/find-replace')
        cy.runAudit()
    })

    it("Migrations should pass the audits", function () {
        cy.visit('/utilities/migrations')
        cy.runAudit()
    })
})
