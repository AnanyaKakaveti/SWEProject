Sprint 4

For this sprint, the frontend team effectively implemented the feed page and made signifigant feature updates throughout the entire website.  For the feed page, users can now see other user's posts for their song of the day including their own. The information for song and user is gotten from the database when users select a song and choose it as their song of the day on the search page.  Along with the feed displaying, there is an interactive like button for the user to like another users song choice. Additionally, on the feed page, there is a "connect with friends button" that gives the user the option to connect with other users that have been registered. 

In regards to the home page and nagivation bar, updates were made to show a visually appealing carosul of different albums on the home page, along with accuratly displaying the navigation bar in regards to if the user is logged in or logged out, including a functional component that switches to welcome instead of login with a logout button. 

For the profile page, the user can track their previously selected songs and upload a profile image, along with delete their account. 

Overall, the frontend has been developed to functionally run each component of the website.

Cypress testing implemented: 

describe('Visit register page', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Register').click()

    // Should be on a new URL which
    // includes '/Register'
    cy.url().should('include', 'register')
    
    // Get an input, type into it
    // cy.get('#search_form_input').type('fake@email.com')
    //  Verify that the value has been updated
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
    cy.url().should('include', '/search');
    cy.get("#input").type("drake")
    cy.wait(10);
    cy.contains("Rich Flex").click()
    cy.contains('Submit').click()
    cy.contains('Wondering what your friends are listening to? Look no further')
  })
})

describe('visit profile page', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
      cy.contains('Login').click()
      cy.get("button").click()
      cy.get("#floatingInput").type("a@a.com")
      cy.get("#floatingPassword").type("a")
      cy.contains('Sign In').click();
      cy.url().should('include', '/search');
      cy.get("#input").type("drake")
      cy.wait(100);
      cy.contains("Rich Flex").click()
      cy.contains('Submit').click()
      cy.contains('Go to Profile').click()
  })
})

  describe('connect with other user', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/')
      cy.contains('Login').click()
      cy.get("button").click()
      cy.get("#floatingInput").type("a@a.com")
      cy.get("#floatingPassword").type("a")
      cy.contains('Sign In').click();
      cy.url().should('include', '/search');
      cy.get("#input").type("drake")
      cy.wait(100);
      cy.contains("Rich Flex").click()
      cy.contains('Submit').click()
      cy.contains('Go to Profile').click()
      cy.contains('Connect with friends').click();
      cy.contains('Lucy').click()
    })
  })
