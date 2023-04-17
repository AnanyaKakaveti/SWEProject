import React, {useEffect, useState} from 'react'
import Typed from 'react-typed';
import {Row} from 'react-bootstrap';


const Home: React.FC = () => { 
    const CLIENT_ID = "d2db8ba7df624158987b5068d737afd7";
    const CLIENT_SECRET = "3a1c96cb492f4750aa714c23b587e5b6";

    const [homeSongs, setHomeSongs] = useState<any[]>([]);
    const [homeSongs2, setHomeSongs2] = useState<any[]>([]);
    const [accessToken, setAccessToken] = useState("");
    // const s = ["0V3wPSX9ygBnCm8psDIegu", "6Uj1ctrBOjOas8xZXGqKk4", "1zi7xx7UVEFkmKfv06H8x0", "6CGMZijOAZvTXG21T8t6R0", "1mWdTewIgB3gtBM3TOSFhB", "7KXjTSCq5nL1LoYtL7XAwS", "5BKKy9fIJL5uM9fz1SnqyP", "65FftemJ1DbbZ45DUfHJXE", "4l0Mvzj72xxOpRrp6h8nHi", "5rb9QrpfcKFHM1EUbSIurX", "35mvY5S1H3J2QZyna3TFe0", "2K87XMYnUMqLcX3zvtAF4G", "3jpZwYrDbX2lQMhHwXjyUD", "2ENexcMEMsYk0rVJigVD3i", "21yRtB6B8EMounImAfHRCP", "7FbrGaHYVDmfr7KoLIZnQ7", "6KOEK6SeCEZOQkLj5M1PxH", "3IelG5zYpWWCZIH4cqWlPV", "2ZBNclC5wm4GtiWaeh0DMx", "3KkXRkHbMCARz0aVfEt68P", "2UVbBKQOdFAekPTRsnkzcf", "0laYHRpNTS6i8FXdupHkJ4", "63irPUP3xB74fHdw1Aw9zR", "7MXVkk9YMctZqd1Srtv4MB", "0hquQWY3xvYqN4qtiquniF", "5enxwA8aAbwZbf5qCHORXi", "2NDMLu8ZNrAsAsPAoW5VOx", "5GYbkDveRD2I8M5ZJ14hWn", "0yLdNVWF3Srea0uzk55zFn", "3GCdLUSnKSMJhs4Tj6CV3s", "1o844wI52S3TjXGBwvGcc7"];
    const s = ["0V3wPSX9ygBnCm8psDIegu", "6Uj1ctrBOjOas8xZXGqKk4", "1zi7xx7UVEFkmKfv06H8x0", "6CGMZijOAZvTXG21T8t6R0", "1mWdTewIgB3gtBM3TOSFhB", "7KXjTSCq5nL1LoYtL7XAwS", "5BKKy9fIJL5uM9fz1SnqyP", "65FftemJ1DbbZ45DUfHJXE", "4l0Mvzj72xxOpRrp6h8nHi", "5rb9QrpfcKFHM1EUbSIurX", "35mvY5S1H3J2QZyna3TFe0", "2K87XMYnUMqLcX3zvtAF4G", "3jpZwYrDbX2lQMhHwXjyUD", "2ENexcMEMsYk0rVJigVD3i", "21yRtB6B8EMounImAfHRCP", "7FbrGaHYVDmfr7KoLIZnQ7", "6KOEK6SeCEZOQkLj5M1PxH", "3IelG5zYpWWCZIH4cqWlPV", "2ZBNclC5wm4GtiWaeh0DMx", "3KkXRkHbMCARz0aVfEt68P", "2UVbBKQOdFAekPTRsnkzcf", "0laYHRpNTS6i8FXdupHkJ4", "63irPUP3xB74fHdw1Aw9zR", "7MXVkk9YMctZqd1Srtv4MB", "0hquQWY3xvYqN4qtiquniF"];

    var input = "";

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

        // anti hero, one dance, innerbloom, butter, humble, chicago, OMG, yeah!

        
        
        {s?.map( (song, i) => {
            console.log(i);
            if (song != "") {
                console.log(song);
                if (i == 0)
                    input = song;
                else    
                    input += ',' + song;

                // else if (i < s.length - 1)
                //     input = input + song + ','; 
                // else
                //     input += song;   
                console.log(input);     
            }
        })}
        input += "," + input;
        show("1");
        show("2");
        
            
        
    }, [])

    async function show(num: string) {
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        // input = "0V3wPSX9ygBnCm8psDIegu,1zi7xx7UVEFkmKfv06H8x0";

        // searches for songs, as well as artist secondhandedly   
        if (num == "1") {
        console.log('https://api.spotify.com/v1/tracks?ids=' + input + '&market=US', searchParameters);
        var trackID = await fetch('https://api.spotify.com/v1/tracks?ids=' + input + '&market=US', searchParameters)
            ?.then(response => response.json())
            .then(data => { 
                console.log(data);
                console.log(data.tracks);
                setHomeSongs(data.tracks);
                // return data.tracks.items[0].id
            })
        }
        else {
            const s2 = s;
            // s2.sort(() => 0.5 - Math.random());
            var input2 = "";
            {s2?.map( (song, i) => {
                console.log(i);
                if (song != "") {
                    console.log(song);
                    if (i == 0)
                        input2 = song;
                    else    
                        input2 += ',' + song;
    
                    // else if (i < s.length - 1)
                    //     input = input + song + ','; 
                    // else
                    //     input += song;   
                    console.log(input2);     
                }
            })}
            input2 += "," + input2;

            
            console.log('https://api.spotify.com/v1/tracks?ids=' + input2 + '&market=US', searchParameters);
        var trackID = await fetch('https://api.spotify.com/v1/tracks?ids=' + input2 + '&market=US', searchParameters)
            ?.then(response => response.json())
            .then(data => { 
                console.log(data);
                console.log(data.tracks);
                setHomeSongs2(data.tracks);
                // return data.tracks.items[0].id
            })
        }
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

        <div></div>
        <div className = "slider">
            <div className="overlay"></div> 
            <div className = "scroll-text">  
                <div className="pictures1">
                    {homeSongs?.map( (song, i) => {
                        console.log(input);
                        if (song == null)
                            return;
                        return(  
                            <img className="mx-1 my-5" width= "125px" height= "auto" key= {i} src={song?.album?.images[1]?.url}></img>
                        )})}
                </div>
                            
            </div>
            <div className = "scroll-text">  
                <div className="pictures2">
                    {homeSongs2?.map( (song, i) => {
                        console.log(input);
                        if (song == null)
                            return;
                        return( 
                            <img className="mx-1 my-5" width= "125px" height= "auto" key= {i} src={song?.album?.images[1]?.url}></img>
                        )})}
                </div>
                      
            </div>
              
        </div>
          

                        
                    
                
                
          
    </>
    
        
    );
};

export default Home;