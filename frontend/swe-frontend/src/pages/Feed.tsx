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
          console.log(content);
          // let newArray = [...content];
          // newArray.reverse();
          // console.log(newArray);
          // setContent(newArray);
          // console.log(content); 

      }
  )();
});
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

              if (song == "")
                return;
              console.log(song);
              return( 
                  <div className="col">
                    <div className="card shadow-sm">
                    <img src="data:image/jpeg;base64,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" className="img-fluid img-thumbnail" alt="img"/>
                      <div className="card-body">
                        <p className="card-text" style={{display:'flex', justifyContent:'left'}}>
                          <div className="small-profile-picture"></div>
                          {song.name ? song.name : <i>anonymous user</i>}</p>
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
              )})}
            </div>
          </div>
        </div>


</div>
</main>
      
    );
}; 
export default Feed;