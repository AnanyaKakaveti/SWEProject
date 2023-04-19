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
The User() function is a Get request in postman, therefore it takes no arguments in the Body of the postman request, unlike the other functions. The function returns the same output as the Register() function alongside creating a cookie corresponding to the users information. This was, they user can login without needing to register each time. 

Post()- http://localhost:8000/api/feed
Posts()  is a POST function was tested with the aid of the frontend, as the database takes in several arguments that would have been difficult to enter manually. This function creates objects of the struct Post and inserts them into a database table called posts. The columns of the posts database are: Email, Song, Caption, Name, Id, Song Name, and Song Image. This function also calls a secondary DeletePost function that deletes all the posts within 24 hours of their creation. This is used to maintain the app’s 24-hour feed concept.

getProfilePosts()  - http://localhost:8000/api/profile_posts/:email
The getProfilePosts() function is a Get request in postman therefore it takes no arguments in the Body. The function returns the posts made by a specific user. It checks the profile posts database for a specific email, that the user is registered as, and gets all the posts that user has made. This is then showed on the profile page. 

getPosts()  - http://localhost:8000/api/list
getPosts() is a GET request that takes in no arguments and returns an array of Post structs that is accumulated from all the entries of the posts table. 

DeleteUser() -  http://localhost:8000/api/deleteuser/:email
The DeleteUser() function is a Delete request in postman, which handles all deletion types. In this case, the function is called when the user decided to delete their account. This function deletes the user specific row in the Users database, based on the registered and logged in user’s email. When this function is called, the user is not longer present in the Users database. 

checkPosts() - http://localhost:8000/api/checkposts/:email
The checkPosts() function is a Get request in postman and  therefore it takes no arguments in the Body. This function goes through the Posts database and checks if the user registered with a specific email has made a post within the past 24hours. If the user makes another post on the same day, the function returns true. If not, the function returns false. This function is called by the DeletePost() function to know whether to delete the post on the posts database or not. 

DeletePost() - http://localhost:8000/api/deletepost/:email"
DeletePost() is a function that makes a DELETE request based on the email that is given as an argument into the URL. This function is triggered if the previous checkPosts() function returns true, meaning that an entry created by a user with the same email passed in as an argument has already created a post within the last 24 hours. This DeleteUser() then deletes the record in the posts database associated with this user. The Posts() function is then called to create a new post to be inserted into the posts database with the information (Email, Song, Caption, Name, Id, Song Name, and Song Image) associated with the user and their new post. 

As a part of Sprint 4, we were able to successfully connect the backend and frontend. Additionally, we created a new table within our pre-existing database called personal_posts that contains Email, Song, Caption, Name, Id, Song Name, and Song Image associated with the user and the posts that they have created. This table maintains all records that have been created. The posts table has also been updated to have the same columns as the personal_posts table, and the table now clears all entries within 24 hours of their creation and deletes entries made by the same user within the past 24 hours. In the future, we plan to implement functionality that allow user to follow each other, like other's posts, display the time that the post was made, and include profile pictures. This can be done by adding additional columns in the database to store this information.  