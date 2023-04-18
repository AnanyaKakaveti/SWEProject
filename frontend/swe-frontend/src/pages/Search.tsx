import React, { useEffect, SyntheticEvent, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Form, InputGroup, FormControl, Button, Row, Card, Modal} from 'react-bootstrap';
import {Link} from "react-router-dom";
import "../components/Scroll.css"

const CLIENT_ID = "d2db8ba7df624158987b5068d737afd7";
const CLIENT_SECRET = "3a1c96cb492f4750aa714c23b587e5b6";
var randomID = "2aPTvyE09vUCRwVvj0I8WK";

var popup = false;



const Search = () => {
    const [name, setName] = useState('');
    var [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [song, setSongID] = useState('');
    const [songname, setSongName] = useState('');
    const [artistname, setArtistName] = useState('');
    const [songimage, setSongImg] = useState('');

    const [songS, setSongS] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [caption, setCaption] = useState('');
    // var [check, checkPresent] = useState(false)
    

    const handleClick = async () => {
        
        // setSongID(song + randomID);
        // song (ID), songName, artistName, songImg
        
        // email = name // posts DB
        const response = fetch('http://localhost:8000/api/feed', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'}, 
            body: JSON.stringify({
                email,
                name,
                song,
                caption,
                songname,
                artistname,
                songimage,
            })
           
        });
        console.log(songname)
        
        // personal posts DB
        const r = fetch('http://localhost:8000/api/profile', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'}, 
            body: JSON.stringify({
                email,
                name,
                song,
                caption,
                songname,
                artistname,
                songimage,
            })
        });

        
};



    // const [searchInput, setSearchInput] = useState(" ");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState<any[]>([]);
    const [triggered, setTriggered] = useState(false);
    


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

    function checkTrigger() {
        if (triggered == false) {
            window.location.href = window.location.href;
            setTriggered(true);
        }
    }

    function closePopup() {
        popup = false;
        setModalOpen(false);
        console.log("updated");
    }

    function clickedSong(s: any) {
        setSongS(s);
        setSongID(s?.id);
        setSongName(s?.name);
        setArtistName(s?.artists[0]?.name);
        setSongImg(s?.album?.images[1]?.url);
        randomID = (s?.id);
        console.log(randomID);
        popup = true;
        setModalOpen(true);
        console.log("popup is set to true");
        console.log(modalOpen);
    }
    

    console.log(albums);
    return (

    <div>
        <script onLoad={checkTrigger}></script>
        <h1 className="text" >Daily Song Picker</h1>

        {/* <input type="name" className="form-control" id="floatingInput" placeholder="Search song" required/> */}
        <div className ="slogan">
            {name ? "Hi " + name : "You are not logged in"}
        </div>
        
        <Container>
        <main className="form-signin w-100 m-auto">
            <InputGroup className= "my-5" size="lg">
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
            
            {/* <Link to="/feed">
             <button className="w-100 btn btn-lg btn-primary my-2" onClick={handleClick}>Submit Song</button>
            </Link>   */}
        </main>
        </Container>

        <div className='searchResults'>
        <Container className= "cards">
            <div className ="searchResultsMessage"> <div className="my-5">{noAlbums() ? "Start typing to see some songs!" : ""} </div> </div>
            <Row className="mx-1 row gx-0 row-cols-4 my-5">
                {albums?.map( (song, i) => {
                    if (song == null) {
                        return;
                    }
                    // console.log('song: ' + song)
                    return (
                        <Card className = "mx-0" onClick={event => {
                            clickedSong(song);
                            // if (songS != undefined)
                            //     console.log(songS);
                            
                        }}>
                            <Card.Img src={song?.album?.images[0]?.url} />
                            <Card.Body className = "mx-0">
                                <Card.Text className= "gx-1"><div className="cardTitle">{song.name}</div></Card.Text>
                                <Card.Text className = "gx-5">{song?.artists[0]?.name}</Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}
            </Row>
        </Container>
        </div>
        
        <Modal className="modal" show={modalOpen}>
            <Modal.Header  closeButton onClick={closePopup}></Modal.Header>
            <Modal.Title className="mx-auto mt-1">Are you sure you want to pick this song?</Modal.Title>
            <div className="justify-content-md-center" >
                <img className="mx-auto d-block mt-3" src={(songS as any)?.album?.images[1]?.url}></img>
            </div>
            <Modal.Body className="mx-auto d-block mt-1">{modalOpen ? (songS as any)?.name + " - " + ((songS as any)?.artists as any)[0]?.name : ""}</Modal.Body>
            <div className="modal-body">
                <form>
                <div className="form-group">
                    <label className="col-form-label">Caption:</label>
                    {/* <textarea className="form-control" id="message-text">
                    onChange = {e => setName(e.target.value)}
                    </textarea> */}
                     <input type="caption" className="form-control"
                            onChange = {e => setCaption(e.target.value)}/>
                </div>
                </form>
            </div>
            <Modal.Footer>
                <Link to="/feed">
                <button className="w-10 btn-lg rounded btn-primary my-2" onClick={handleClick}>Submit</button>
                </Link> 
            </Modal.Footer>
        </Modal>
    </div>
     );
 };

 

export default Search;