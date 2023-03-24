package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"time"

	//"github.com/TutorialEdge/realtime-chat-go-react/database"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gorilla/websocket"
	"golang.org/x/crypto/bcrypt"
)

// We'll need to define an Upgrader
// this will require a Read and Write buffer size
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,

	// We'll need to check the origin of our connection
	// this will allow us to make requests from our React
	// development server to here.
	// For now, we'll do no checking and just allow any connection
	CheckOrigin: func(r *http.Request) bool { return true },
}

// define a reader which will listen for
// new messages being sent to our WebSocket
// endpoint
func reader(conn *websocket.Conn) {
	for {
		// read in a message
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		// print out that message for clarity
		fmt.Println(string(p))

		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}

	}
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	}

// define our WebSocket endpoint
func serveWs(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)

	// upgrade this connection to a WebSocket
	// connection
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}
	// listen indefinitely for new messages coming
	// through on our WebSocket connection
	reader(ws)
	enableCors(&w)
}

type User struct {
	Id 			uint `json: "id"`
	Name 		string `json:"name"`
	Email 		string `json: "email" gorm: "unique"`
	Password 	[]byte `json: "-"`
}

func setupRoutes() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Simple Server")
	})
	// mape our `/ws` endpoint to the `serveWs` function
	http.HandleFunc("/ws", serveWs)
}

var DB *gorm.DB

func Connect() {
	var err error

	connection, err := gorm.Open(mysql.Open("sqluser:password@/myloginpage"), &gorm.Config{})

	if err != nil {
		panic("could not connect to the database")
	}

	DB = connection

	connection.AutoMigrate(&User{})
}



func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err :=c.BodyParser(&data); err !=nil {
		return err
	}

	password, _ := bcrypt.GenerateFromPassword([] byte (data ["password"]), 14)

	user := User {
		Name: 		data["name"],
		Email: 		data["email"],
		Password: 	password,
	}
	

	DB.Create(&user)
	
	return c.JSON(user)

	//return c.SendString("Hello, World 👋!")
}

const SecretKey = "secret"

func Login(c *fiber.Ctx) error {

	var data map[string]string

	if err :=c.BodyParser(&data); err !=nil {
		return err
	}

	var user User 

	DB.Where("email = ?", data["email"]).First(&user)

	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		//Fiber map is a map with a stirng and an interface (can put anythin there)
		return c.JSON(fiber.Map {
			"message" : "user not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map {
			"message" : "incorrect password",
		})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer : strconv.Itoa(int(user.Id)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), 

	})

	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map {
			"message" : "could not login",
		})
	}

	cookie := fiber.Cookie{
		Name : 		"jwt",
		Value : 	token, 
		Expires : 	time.Now().Add(time.Hour * 24),
		HTTPOnly : 	true, 
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map {
		"message" : "success",
	})
}

func Users(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface {}, error) {
		return []byte(SecretKey), nil
	})

	if err !=nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map {
			"message" : "unauthenticated",
		})
	}

	//return standard claims

	claims := token.Claims.(*jwt.StandardClaims)

	var user User 

	DB.Where("id = ?", claims.Issuer).First(&user)

	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name: "jwt", 
		Value: "",
		Expires: time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message" : "success",
	})

}


func Setup(app *fiber.App) {
	app.Post("/api/register", Register)
	app.Post("/api/login", Login)
	app.Get("/api/user" , Users)
	app.Post("/api/logout", Logout)
}




func main() {
	// fmt.Println("Chat App v0.01")
	// setupRoutes()
	// http.ListenAndServe(":8080", nil)
	Connect()


	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials : true,
	}))

	Setup(app)

	app.Listen(":8000")
}