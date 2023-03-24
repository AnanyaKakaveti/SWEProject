Backend Documentation 
Downloads and Installations for SQL Database: 
download MySQL Community Server, MySQL Workbench
Go Installation: 
terminal: 
go get "github.com/gofiber/fiber/v2
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql 

get VSCode extension: MySQL managment by Jun Han
Data base Set up: 
create new connection. host: local host, user: sqluser, pass: password 


tutorials we used to troubleshoot MySQL: 
https://www.geeksforgeeks.org/how-to-connect-to-mysql-server-using-vs-code-and-fix-errors/
https://stackoverflow.com/questions/10577374/mysql-command-not-found-in-os-x-10-7


To set up out MySQL database, we created a new query inside localhost called myloginpage. There was a somewhat steep learning curve to set up the database. We initially had considerable difficulty configuring the database and getting it to run on our individual machines. After configuring paths and running several commands in terminal to download fiber, gorm, and create the mysql user and password, we were then able to use our database as desired. Inside this database is a table with user information, including id, name, email, and password (which is encrypted). Every time a user registers, the data gets added to the table. It can then be accessed by various functions in the backend main.go file (Register(), Login(), and User()). 

Testing: used Postman to test the backend
Download Postman: https://www.postman.com/downloads/
In postman, we created requests to test the registration, login, and user functions(which are written in backend/main.go). Each of these functions correspond with a url and the data from the database is being fetched using these urls. 

Unit Tests: 
Register() - http://localhost:8000/api/register
{
    "name": "name",
    "email": "a@a.com",
    "password": "1"

}
In postman, we created a Post request with the data above in Body as a raw JSON. 
The output for this request was: 
{
    "Id": 19,
    "name": "name",
    "Email": "a@a.com",
    "Password": "JDJhJDE0JGZsaklYZWg2Zlh3Lmk1dWg5S3FETXUuSjd6VS4udUhiNXJZNmphZ2RZU0hjR0hMbldEZFVT"
}
This shows that the user is successfully added to the database. We made sure to encrypt the password using golangs inbuilt bcrypt function to ensure the security of the users' passwords. 

Login()-  http://localhost:8000/api/login
{
    "email": "a@a.com",
    "password": "1"

}
In postman, we created a Post request with the data above in Body as a raw JSON. 
The output for this request was: "message":  "success" 
This shows that the user was succesfully able to login and their credentials match the data in the databse, from when they registered. 

Login()-  http://localhost:8000/api/login
{
    "email": "a@a.com",
    "password": "100"

}
The above is an example of a user logging in with the worng email/password. This means the data enetered above is not in the databse and does not match what the user registered as. The output for this request was: "message": "user not found" 

User()- http://localhost:8000/api/user
The User() function is a Get request in postman, therefore it takes no arguments in the Body of the postman request, unlike the other functions. The function returns the same output as the Register() function alongside creating a cookie corresponding to the uers information. This was, they user can login without needing to register each time. 

After testing the unit cases in Postman, we then began the process of integrating the frontend and the backend. We did this by calling the backend functions in the frontend and fetching the contents of the database. We also changed the routing of the program to the newly created frontend pages, so that after the user registers, they go directly to the login page. This is essential so that the cookie containing the user's information gets made. We also tested that the user has been properly authenticated by including a line that welcomes the user after they have logged in successfully. 

Frontend Documentation:

Regarding the frontend aspect of Sprint 2, we created a react wrapper component on the home page called Typed that cycled through different artists to display one after the next.This is mostly aesthetic, but we can expand upon this after the API is connected to this application. Additionally, we added a purple color to all of the buttons in order to this to optimize the aesthetic of the site. When officially registering as a new user, the user is rerouted to the login page to re-enter their credentials to officially log in and have the front end connect the data to the backend database.

After successfully signing in, the new user is asked to input a new song of the day. This is the whole basis of the application to search the database of songs and have user's selection logged into their account for future reference. Note that this page will be fully functional once our chosen music API is integrated with the application. When the user selects their song, the route directs the user to their feed that displays all their connected friends songs. For now, the songs here are hard coded to our front end to display an example feed page. Each post is displayed as a card, using bootstrap, with the name of the user, the song title, artist, album cover, and even a timestamp. 

Lastly, we implemented a brand new Footer to keep the website more in line with the standards for a usual web application. The footer comes with a clickable linkedin and github (both are functional, but the github actually directs to the github of this project).

Cypress Tests: 

In order to run the cypress tests, we need to direct to the frontend/swe-frontend folder and run "npx cypress open" (refer to readme file for more instructions to set up cypress) which will open a cypress browser. After we click the chrome option, another browser will pop up with the tests that we created. We made 4 tests that carry out relatively simply functions.

The first test visits the register page via the button on the navbar, and checks if the url matches what we expect. The second test does the same with the login page. The third test visits the register page and then returns to the home page, checking whether the contents of the page are what we expect. The last test clicks on the login button, which will take it to the search page, which is the page that allows the user to pick a song. After hitting the submit button, the test is directed to the feedpage. After all these tests are ran, if everything runs as expected, they pass. As shown in the video, all of these tests do as we wished, so we know our buttons are working.