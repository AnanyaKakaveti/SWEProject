import react, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Container, Form, InputGroup, FormControl, Button, Row, Card, Modal} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

type UserProps = {
  name: string
  song: string
}

var popup = false;


export const Feed = (props: UserProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [song, setSong] = useState('');
  const [content, setContent] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    (
        async () => {
            const reponse = await fetch('http://localhost:8000/api/user', {
                headers: {'Content-Type' : 'application/json'}, 
                credentials : 'include',
            });

            const content = await reponse.json();
            setName(content.name);
            setSong(content.songS);
            setEmail(content.Email); 
        }
    )();
});

// const handleClick = async(email: string) => {
//   console.log("email: " + email); 
//   const r = await fetch(`http://localhost:8000/api/pofile_posts/${email}`,{
//     method: 'GET', 
//     headers: {'Content-Type' : 'application/json'}, 
//     credentials : 'include',

//   })
  
//   const c = await r.json(); 
//   console.log(c);  // array per email 
// }; 

// content is the array of posts 

const handleClick = () =>{
  console.log("connecting users");
}
function closePopup() {
  popup = false;
  setModalOpen(false);
  console.log("updated");
}

function connectUsers() {
  popup = true;
  setModalOpen(true);
  console.log("find Users popup is open");
  console.log(modalOpen);
}
const alertClicked = () => {
  alert('you connected with another user');
};

useEffect(() => {
  (
      async () => {
          const reponse = await fetch('http://localhost:8000/api/list', {
              headers: {'Content-Type' : 'application/json'}, 
              credentials : 'include',
          });

          setContent(await reponse.json()); 
          console.log(content); // this is the array 
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
                <button className="btn-primary" onClick={event => { connectUsers() }}> Conect with Friends </button>
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
    
            <Modal className="modal" show={modalOpen}>
            <Modal.Header  closeButton onClick={closePopup}></Modal.Header>
            <Modal.Title className="mx-auto mt-1">Get connected with friends</Modal.Title>
            <div className="justify-content-md-center" >
            </div>
            <Modal.Body className="mx-auto d-block mt-1"> connect </Modal.Body>
            <div className="modal-body">
            <ListGroup as="ul">
            {/* {content?.slice(0).reverse().map( (song, i) => {
                  // var obj = feedS[i];
                  if (song == "")
                    return;
                  return( 
                  } */}
                
            {/* <div key={i}> */}

            <ListGroup.Item action onClick={alertClicked}>
            <div className="profile-picture"></div>
               user1
           </ListGroup.Item>
            {/* } */}
          </ListGroup>
                <form>
                <div className="form-group">
                    <label className="col-form-label"> Message:</label>
                    <textarea className="form-control" id="message-text"></textarea>
                </div>
                </form>
            </div>
            <Modal.Footer>
                <Link to="/feed">
                <button className="w-10 btn-lg rounded btn-primary my-2" onClick={closePopup}>Submit</button>
                </Link> 
            </Modal.Footer>
        </Modal>
    </div>
    </main>
      
    );
}; 
export default Feed;