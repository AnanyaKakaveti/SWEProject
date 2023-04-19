Sprint 4

For this sprint, the frontend team effectively implemented the feed page and made signifigant feature updates throughout the entire website.  For the feed page, users can now see other user's posts for their song of the day including their own. The information for song and user is gotten from the database when users select a song and choose it as their song of the day on the search page.  Along with the feed displaying, there is an interactive like button for the user to like another users song choice. Additionally, on the feed page, there is a "connect with friends button" that gives the user the option to connect with other users that have been registered. 

In regards to the home page and nagivation bar, updates were made to show a visually appealing carosul of different albums on the home page, along with accuratly displaying the navigation bar in regards to if the user is logged in or logged out, including a functional component that switches to welcome instead of login with a logout button. 

For the profile page, the user can track their previously selected songs and upload a profile image, along with delete their account. 

Overall, the frontend has been developed to functionally run each component of the website.

Cypress testing implemented: 
  - visit register page: go to the register page through the nav bar register button
  - visit login page: go to the login page through the nav bar login button
  - visit register then return to homepage: go to the register then backt o home page by clicking the Jam. button on the top left corner
  - visit feed page: register a user and run through all the form inputs and buttons to login a user then choose a artist and song in order to go to the feed page
  - go to profile page: same as above but also click the profile page button. 
  - connect with other user: once on the profile page, test the connect with other users button to see other registered users.
