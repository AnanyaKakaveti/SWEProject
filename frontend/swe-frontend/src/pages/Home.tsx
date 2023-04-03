import React, {useEffect, useState} from 'react'
import Typed from 'react-typed';
import {Row} from 'react-bootstrap';


const Home: React.FC = () => {
    const CLIENT_ID = "d2db8ba7df624158987b5068d737afd7";
    const CLIENT_SECRET = "3a1c96cb492f4750aa714c23b587e5b6";

    const [homeSongs, setHomeSongs] = useState<any[]>([]);
    const [accessToken, setAccessToken] = useState("");

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

             const s = ["0V3wPSX9ygBnCm8psDIegu", "1zi7xx7UVEFkmKfv06H8x0", "6CGMZijOAZvTXG21T8t6R0", "1mWdTewIgB3gtBM3TOSFhB", "7KXjTSCq5nL1LoYtL7XAwS", "5BKKy9fIJL5uM9fz1SnqyP", "65FftemJ1DbbZ45DUfHJXE", "5rb9QrpfcKFHM1EUbSIurX", "35mvY5S1H3J2QZyna3TFe0", "6Uj1ctrBOjOas8xZXGqKk4", "2K87XMYnUMqLcX3zvtAF4G", "3jpZwYrDbX2lQMhHwXjyUD", "2ENexcMEMsYk0rVJigVD3i", "21yRtB6B8EMounImAfHRCP", "7FbrGaHYVDmfr7KoLIZnQ7"];
        // anti hero, one dance, innerbloom, butter, humble, chicago, OMG, yeah!

        
        var input = "";
        {s.map( (song, i) => {
            if (i < s.length - 1)
                input += song +',';
            else
                input += song;    
        })}
        console.log("Search for " + input);
        // Get request using search to get Artist ID
        show(input);
            
        
    }, [])

    async function show(input: string | undefined) {
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        // input = "0V3wPSX9ygBnCm8psDIegu,1zi7xx7UVEFkmKfv06H8x0";

        // searches for songs, as well as artist secondhandedly   
        console.log('https://api.spotify.com/v1/tracks/?ids=' + input + '&market=US', searchParameters);
        var trackID = await fetch('https://api.spotify.com/v1/tracks/?ids=' + input + '&market=US', searchParameters)
            .then(response => response.json())
            .then(data => { 
                console.log(data);
                console.log(data.tracks);
                setHomeSongs(data.tracks);
                // return data.tracks.items[0].id
            })
    }

    return (
    <>
        <div className="form-signin w-100 m-auto">
            <div className="style">JAM.</div>  
            <div className= 'flex justify-center items-center'>
                <p className="slogan">
                    The platform that connects music to people.
                </p>
                <Typed 
                    className= "artists" 
                    strings = {['Taylor Swift', 'Michael Jackson', 'The Weeknd', 'Queen', 'Justin Bieber', 'Madonna', 'The Beatles', 'BTS']} 
                    typeSpeed={80} 
                    backSpeed={70} 
                    // startDelay={200} 
                    // backDelay={200} 
                    loop/>
            </div>
            {/* <div className ="space"></div> */}
        </div>

        
                    <div className = "slider">
                        <div className = "scroll-text">
                            
                            <div className="overflow-hidden text-nowrap d-inline">s
                                {homeSongs.map( (song, i) => {
                                    
                                return(
                                    <img className="mx-1 my-5" width= "150px" height= "auto" key= {i} src={song.album.images[1].url}></img>
                                )})}
                            </div>
                            
                        </div>
                    </div>
                        
                    
                
                
          
    </>
    
        
    );
};

export default Home;