describe('Login Test', () => {
    beforeEach(() => {
        Cypress.session.clearAllSavedSessions()
        cy.intercept('POST', '**/v3/relyingparty/verifyPassword?**').as('login')
        cy.visit('/')
        cy.get(`a[href='/signin']`).click()
    })

    afterEach(() => {
        cy.screenshot()
    })

    it('Invalid email', () => {
        cy.get('input[name=email').clear().type('invalid@mail.com')
        cy.get('input[name=password').clear().type(Cypress.env('password'))
        cy.get('div p button').contains('LOGIN').click()
        cy.wait('@login')
        cy.get('#toast-container').should('be.visible')
    })

    it('Invalid password', () => {
        cy.get('input[name=email').clear().type(Cypress.env('email'))
        cy.get('input[name=password').clear().type('invalidpass')
        cy.get('div p button').contains('LOGIN').click()
        cy.wait('@login')
        cy.get('#toast-container').should('be.visible')
    })

    it('Successful login', () => {
        cy.get('input[name=email').clear().type(Cypress.env('email'))
        cy.get('input[name=password').clear().type(Cypress.env('password'))
        cy.get('div p button').contains('LOGIN').click()
        cy.wait('@login').its('response').then((response) => {
            expect(response.statusCode).to.eq(200)
            cy.get('div[class=navbar-item] div[class=buttons] a').should('have.text', 'Sign out')
        })
    })
})