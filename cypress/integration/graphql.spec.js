describe('GraphQL', () => {
    beforeEach(function() {
        cy.login()
    })

    it('shows the GraphQL Schemas page', () => {
        cy.visit('/graphql/schemas')
        cy.get('h1').contains("GraphQL Schemas")
    })

    it("GraphQL Schemas should pass the audits", function () {
        cy.visit('/graphql/schemas')
        cy.runAudit()
    })

    it("Create a new GraphQL Schema should pass the audits", function () {
        cy.visit('/graphql/schemas/new')
        cy.runAudit()
    })

    it("GraphQL Tokens should pass the audits", function () {
        cy.visit('/graphql/tokens')
        cy.runAudit()
    })

    it("Create a new GraphQL token should pass the audits", function () {
        cy.visit('/graphql/tokens/new')
        cy.runAudit()
    })
})
