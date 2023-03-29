describe('Visit register page', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Register').click()

    // Should be on a new URL which
    // includes '/Register'
    cy.url().should('include', 'Register')
    
    // Get an input, type into it
    // cy.get('#search_form_input').type('fake@email.com')
    //  Verify that the value has been updated
    // cy.get('email').should('have.value', 'fake@email.com')

    
  })
})
describe('Visit login page', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Login').click()
    cy.url().should('include', 'login')   
  })
})

describe('Visit register page, return to homepage', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Login').click()
    cy.contains('JAM.').click()
    cy.contains('The platform that connects music to people.')
  })
})

describe('Visit feed page', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Login').click()
    cy.get("button").click()
    cy.get("#floatingInput").type("a@a.com")
    cy.get("#floatingPassword").type("a")
    cy.contains('Sign In').click();
    cy.contains("Submit Song/Go to Feed").click()
    cy.contains('Wondering what your friends are listening to? Look no further')
  })
})

describe('Visit profile page', () =>{
  it('passes', ()=>{
    cy.visit('http://localhost:3000/')
    cy.contains('Login').click()
    cy.get("button").click()
    cy.get("#floatingInput").type("a@a.com")
    cy.get("#floatingPassword").type("a")
    cy.contains('Sign In').click();
    cy.contains("Submit Song/Go to Feed").click()
    cy.contains('Wondering what your friends are listening to? Look no further')
    cy.contains("Go to Profile").click();
    cy.contains("Welcome to your profile page");
  
  })
}


)
