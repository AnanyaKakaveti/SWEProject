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

After testing the unit cases in Postman, we then began the process of integrating the frontend and the backend. We did this by calling the backend functions in the frontend and fetching the contents of the database. We also changed the routing of the program to the newly created frontend pages, so that after the user registers, they go directly to the login page. This is essential so that the cookie containing the user's information gets made. We also tested that the user has been properly authenticated by including a line that welcomes the user after they have logged in successfully. 

As a part of Sprint 3, we were able to succesffully connect the backend and frontend parts from sprint2. Addiionally, we created a new table within our pre-existing database that contains the logged in user's email address and selected song of the day. Currently, in our backend function, the song ID is a random songID and in the next sprint we plan to connect the frontend with the backend, so the ID in the table is associated with the song ID the user clicked on. 

Post()- http://localhost:8000/api/feed{
   "email" : "q@q.com"
   "song" : "10000"
}
The Post() function is a POST request in Postman that fetches the user's email using the previous declared GET User() function and posts the random songID that we assigned. When this function runs in Postman, it creates a new post to the table by calling the user's email and user's picked song. 



Frontend Documentation

We used the Spotify API (https://developer.spotify.com/documentation/web-api) and scraped the data using endpoints that accesses Spotify songs based on what the user searches. We have it set up so that the API looks through artists and songs and returns them to the user based on relevance. This data is showcased on the search page, where there is a text input area and an empty black screen at the bottom. As the user begins typing, songs with the closest match to the input will begin to populate the empty area, displaying the name of the song, the artist and the album image. The user can even scroll through this area for more varied results. 

The search page has a function that highlights a song that the mouse hovers over, which will soon be expanded upon to have a selection functionality. Once we develop the ability to select a given song, we can save the ID of the song and access it directly from the Spotify API. We can then display the same information on the feed page and other areas that we might want to access this data.

We also implemented a profile page that displays the user's name and email (as supplied from the backend). This profile page can be accessed via a button on the feed page, and also has a button that allows the user to return to the feed page. Of course, the profile page will be expanded upon in the future so that perhaps the user can view their songs that they chose in the past. 

Other functionalities that we are thinking of adding include: a small audio preview of the song they hover over to make the song selection page more interactive, a feed page that uses the database and displays songs that other people have posted, a profile page with a changeable profile picture (perhaps using artists' images from the API) and other profile-related attributes.

We also created two cypress tests to ensure the search page and the profile page were being reached accurately. They all passed as expected.