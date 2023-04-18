import { SentimentDissatisfiedSharp } from '@mui/icons-material';
import react, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";


type UserProps = {
  name: string
  song: string
}



export const Feed = (props: UserProps) => {

  const [name1, setName] = useState('');
  const [song, setSong] = useState('');
  const [content, setContent] = useState<any[]>([]);
  const [songS, setSongS] = useState({}); 
  const [feedS, setFeedS] = useState<any[]>([]);
  const [called, setCalled] = useState(false);

  const CLIENT_ID = "d2db8ba7df624158987b5068d737afd7";
  const CLIENT_SECRET = "3a1c96cb492f4750aa714c23b587e5b6";
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
    console.log("running this");

    
  }, [])

  useEffect(() => {
    
    (
        async () => {
            const reponse = await fetch('http://localhost:8000/api/user', {
                headers: {'Content-Type' : 'application/json'}, 
                credentials : 'include',
            });

            const content1 = await reponse.json();
            setName(content1.name1);
            setSong(content1.songS);

            
        }
        
    )();
});

// content is the array of posts 
useEffect(() => {
  (
      async () => {
          const reponse = await fetch('http://localhost:8000/api/list', {
              headers: {'Content-Type' : 'application/json'}, 
              credentials : 'include',
          });

          setContent(await reponse.json()); // this is the array 
          // setContent(content.reverse());
          // console.log(content);
          // let newArray = [...content];
          // newArray.reverse();
          // console.log(newArray);
          // setContent(newArray);
          // console.log(content); 

      }

      
  )();
});

useEffect(() => {
  var input = "";
  {content?.map( (song, i) => {
    console.log(i);
    if (song.Song != "") {
        // console.log(song.Song);
        if (i == 0)
            input = song.Song;
        else if (i < 50)   
            input += ',' + song.Song;
        else
          input += "";    

        // else if (i < s.length - 1)
        //     input = input + song + ','; 
        // else
        //     input += song;   
          
        
    }
  })}
  // console.log(input);   
  findSong(input);

})

  async function findSong(id : string) {
    if (called)
      return;

    console.log(id);
    var searchParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }

    console.log("running this2");  
    
    console.log('https://api.spotify.com/v1/tracks?ids=' + id + '&market=US', searchParameters);
    var trackID = await fetch('https://api.spotify.com/v1/tracks?ids=' + id + '&market=US', searchParameters)
        ?.then(response => response.json())
        .then(data => { 
            // console.log(data);
            console.log(data.tracks);
            setFeedS(data.tracks);
            // return data.tracks.items[0].id
        })
    setCalled(true);    
    }
  

    return (
    <main className="form-signin w-100 m-auto">
     <div className="feed">    
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Jam Feed</h1>
            <p className="lead">Wondering what your friends are listening to? Look no further</p>
            <button className="btn-primary" > <Link to="/profile" className="nav-link" >Go to Profile</Link> </button>
          </div>
        </div>
      </section>

        <div className="album py-5 bg-light">
          <div className="container-fluid">

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {content?.slice(0).reverse().map( (song, i) => {
              // var obj = feedS[i];
              if (song == "")
                return;
              console.log(i);
              return( 
    
                <div key={i}>
                  <div className="col" > 
                    <div className="card shadow-sm"> 
                    {/* src={(obj as any)?.album?.images[1]?.url} */}
                    <img src="" className="img-fluid img-thumbnail" alt="img" />
                      <div className="card-body"  style={{display:'flex', justifyContent:'left', paddingBottom:'1px'}}>
                        {song?.Song} 
                      </div>
                      <div className="card-body">
                        <div className="card-text" style={{display:'flex', justifyContent:'left'}}>
                          <div className="small-profile-picture"></div>
                          <div className="mt-1 mb-3">
                            {song.name ? song.name : <i>anonymous user</i>}
                          </div>
                        </div>
                        <p className="card-text" style={{display:'flex', justifyContent:'left'}}>{song.Caption ? song.Caption : <i>no caption</i>}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button> 
                          </div>
                          <small className="text-muted">Posted 3 minutes ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>


</div>
</main>
      
    );
}; 
export default Feed;