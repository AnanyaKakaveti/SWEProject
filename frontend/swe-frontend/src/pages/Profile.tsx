import react, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios'


type ProfileProps = {
    name: string
    email: string
}

export const Profile = (props: ProfileProps) => {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    const [content, setContent] = useState<any[]>([]);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
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

            }
            
        )();

    });

    useEffect(() => {
        (
            async () => {
                console.log("email: " + email); 
                const r = await fetch(`http://localhost:8000/api/profile_posts/${email}`,{
                method: 'GET', 
                headers: {'Content-Type' : 'application/json'}, 
                credentials : 'include',
                })
                setContent(await r.json()); 
                console.log(content);  // array per email 
            }
            
        )();

    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const deleteRow = async (email: string) => {
        // console.log(email)
        // deletes row in table user
        const response = await fetch(`http://localhost:8000/api/deleteuser/${email}`, {
            method: 'DELETE', 
            headers: {'Content-Type' : 'application/json'}, 
            credentials : 'include',
          })
            .then((response) => {
              // Handle successful response
              console.log("user deleted")
            })
            .catch((error) => {
              // Handle error response
              console.log("deletion unsuccessful", error)
            });
            // deletes cookie 
            await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'}, 
                credentials : 'include',
            });
      };

return(
    <div>
    <main className="form-signin w-100 m-auto">
        {/* <div className="greeting">Welcome to your profile page</div> */}
        {/* <div className="profile-picture"></div> */}
        {imageSrc && (
        <img
          src={imageSrc}
          alt="Profile Image"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      )}

        <div className ="greeting">
        <h1> {name ? "Hi " + name + "!": "You are not logged in"}</h1> 

        <p> {email ? "Email: " + email : "No email is registered"}</p>
        <form>
      <div className="form-group">
        <label htmlFor="exampleFormControlFile1">Upload a profile picture</label>
        <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={handleFileChange}></input>
      </div>
    </form>
    
    <p> </p>
        <button className= "btn-primary"> <Link to="/feed" className="nav-link" >Go back to Feed</Link>  </button>

        <button className= "btn-primary mt-2" onClick = {() => deleteRow(email)}> <Link to="/" className = "nav-link"> Delete My Account</Link></button>
        <h1 className ="greeting"> Your daily songs </h1>

        </div>
        </main>
  
        <div className="">
              <div className="container-fluid">
    
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                
                {content?.slice(0).reverse().map( (song, i) => {
                  // var obj = feedS[i];
                  if (song == "")
                    return;
                  return( 
        
                    <div key={i}>
                      <div className="col" > 
                        <div className="card shadow-sm"> 

                        {/* src={(obj as any)?.album?.images[1]?.url} */}
                        
                        <img src={song.SongImg != "" ? song.SongImg : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Blank_Square.svg/800px-Blank_Square.svg.png"} className="img-fluid img-thumbnail" alt="img" />
                          <div className="card-body"  style={{display:'flex', justifyContent:'left', paddingBottom:'1px'}}><b>
                            {song.SongName != "" ? (song?.SongName + " - " + song?.ArtistName) : "unknown song - unknown artist"} 
                            </b></div>
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
                                <button type="button" className="btn btn-sm btn-outline-secondary">Like</button> 
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
);
};

// export default Profile;