
// import React, {SyntheticEvent, useState} from 'react'
// import {Link} from "react-router-dom";


// const Search = () => {

//     const [song, setSong] = useState('');

// const handleClick = () => { 
//     console.log("present following feed");
// };

// const submit = (e: SyntheticEvent) => {
//     e.preventDefault();

//     console.log({
//        song
//     })
// }

//     return (

//     <form onSubmit = {submit}>
//         <h1 className="text" >Search for your song of the day</h1>
//         <input type="song" className="form-control" id="floatingInput" placeholder="Search song" required/>

//         <Link to="/feed">
//             <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleClick}>submit song</button>
//         </Link>  

//     </form>

    


import React, { useEffect, SyntheticEvent, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Form, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import {Link} from "react-router-dom";

const CLIENT_ID = "d2db8ba7df624158987b5068d737afd7";
const CLIENT_SECRET = "3a1c96cb492f4750aa714c23b587e5b6";


const Search = () => {
    const [name, setName] = useState('');

    const handleClick = () => { 
    console.log("present following feed");
};



// this is the stuff that chandini and anisha did, but it conflicts with calling an api

    useEffect(() => {
        (
            async () => {
                const reponse = await fetch('http://localhost:8000/api/user', {
                    headers: {'Content-Type' : 'application/json'}, 
                    credentials : 'include',
                });

                const content = await reponse.json();
                setName(content.name);
            }
        )();
    });



    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState<any[]>([]);

    useEffect(() => {
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
    async function search() {
        console.log("Search for " + searchInput);

        // Get request using search to get Artist ID
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        

        // for albums
        
        /*
        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => response.json())
            .then(data => { return data.artists.items[0].id})

        console.log("Artist ID is " + artistID);   

        // Get request with Artist ID to grab all the albums from that artist
        // do include_groups=album,single for individual songs as well
        var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album,single&market=US&limit=50&include_external=audio', searchParameters)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAlbums(data.items);
            });
            */
            

        // searches for songs, as well as artist secondhandedly   
        var trackID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track&market=US&limit=48&include_external=audio', searchParameters)
            .then(response => response.json())
            .then(data => { 
                console.log(data);
                setAlbums(data.tracks.items);
                // return data.tracks.items[0].id
            })
    }



    console.log(albums);
    return (

    <div>
        <h1 className="text" >Daily Song Picker</h1>

        {/* <input type="name" className="form-control" id="floatingInput" placeholder="Search song" required/> */}
        <div>
            {name ? "Hi " + name : "You are not logged in"}
        </div>
        
        <Container>
            <InputGroup className= "mb-3" size="lg">
                <Form.Control 
                    placeholder = "Search Songs/Artists"
                    type="input"
                    onKeyPress={event => {
                        if (event.key =="Enter") {
                            search();
                        }
                    }}
                    onChange={event => {
                        setSearchInput(event.target.value);
                        console.log('input: ' + searchInput);
                        search();
                    }
                    }
                    />
                <Button onClick ={search}>Search</Button>
            </InputGroup>
            <Link to="/feed">
             <button className="w-100 btn btn-lg btn-primary my-2" type="submit" onClick={handleClick}>Submit Song/Go to Feed</button>
         </Link>  
        </Container>
        <div className='searchResults'>   
        <Container className= "cards">
            <Row className="mx-1 row gx-0 row-cols-6 my-5">
                {albums.map( (song, i) => {
                    console.log('song: ' + song);
                    return (
                        <Card>
                            <Card.Img src={song.album.images[0].url} />
                            <Card.Body className = "mx-0">
                                <Card.Title className= "gx-1"><h6>{song.name}</h6></Card.Title>
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