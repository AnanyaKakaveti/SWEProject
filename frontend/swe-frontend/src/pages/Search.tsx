import React, { useEffect, SyntheticEvent, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Form, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import {Link} from "react-router-dom";
import "../components/Scroll.css"

const CLIENT_ID = "d2db8ba7df624158987b5068d737afd7";
const CLIENT_SECRET = "3a1c96cb492f4750aa714c23b587e5b6";
const randomID = "2aPTvyE09vUCRwVvj0I8WK";




const Search = () => {
    const [name, setName] = useState('');
    var [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    var [song, setSongID] = useState('');

    const handleClick = () => {
        
        song = song + randomID
        // email = name
        const response = fetch('http://localhost:8000/api/feed', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'}, 
            body: JSON.stringify({
                email,
                song,
            })
        });
};

    // const [searchInput, setSearchInput] = useState(" ");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState<any[]>([]);

    useEffect(() => {
        (
            async () => {
                const reponse = await fetch('http://localhost:8000/api/user', {
                    headers: {'Content-Type' : 'application/json'}, 
                    credentials : 'include',
                });

                const content = await reponse.json();
                setName(content.name);
                setEmail(content.Email);
                // setPassword(content.password);
            }
        )();


        var authParameters = {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, [])

    // Search
    async function search(searchInput: string | undefined) {
        console.log("Search for " + searchInput);

        // Get request using search to get Artist ID
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
            
        // searches for songs, as well as artist secondhandedly   
        console.log('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track&market=US&limit=48&include_external=audio', searchParameters);
        var trackID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track&market=US&limit=48&include_external=audio', searchParameters)
            .then(response => response.json())
            .then(data => { 
                console.log(data);
                setAlbums(data.tracks.items);
                // return data.tracks.items[0].id
            })
    }

    function noAlbums() {
        console.log(albums.length);
        if (albums.length == 0)
            return true;
        else
            return false;    
     }

    console.log(albums);
    return (

    <div>
        <h1 className="text" >Daily Song Picker</h1>

        {/* <input type="name" className="form-control" id="floatingInput" placeholder="Search song" required/> */}
        <div className ="slogan">
            {name ? "Hi " + name : "You are not logged in"}
        </div>
        
        <Container>
        <main className="form-signin w-100 m-auto">
            <InputGroup className= "mb-3" size="lg">
                <Form.Control 
                    placeholder = "Search Songs/Artists"
                    type="input"
                    onChange={event => {
                        console.log('event: ' + event.target.value);
                        // var s = String(event.target.value);
                        // setSearchInput(event.target.value);
                        // console.log('input: ' + searchInput);
                        search(event.target.value);
                    }
                    }
                    />
                {/* <Button onClick ={search}>Search</Button> */}
            </InputGroup>
            
            <Link to="/feed">
             <button className="w-100 btn btn-lg btn-primary my-2" onClick={handleClick}>Submit Song</button>
            </Link>  
        </main>
        </Container>


        <div className='searchResults'>
        <Container className= "cards">
            <div className ="searchResultsMessage"> <div className="my-5">{noAlbums() ? "Start typing to see some songs!" : ""} </div> </div>
            <Row className="mx-1 row gx-0 row-cols-4 my-5">
                {albums?.map( (song, i) => {
                    console.log('song: ' + song)
                    return (
                        <Card className = "mx-0">
                            <Card.Img src={song.album.images[0].url} />
                            <Card.Body className = "mx-0">
                                <Card.Text className= "gx-1"><div className="cardTitle">{song.name}</div></Card.Text>
                                <Card.Text className = "gx-5">{song.artists[0].name}</Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}
            </Row>
        </Container>
        </div>
    </div>
     );
 };

export default Search;