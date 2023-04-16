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
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [song, setSong] = useState('');

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
        }
    )();
});
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
    return (
    <main className="form-signin w-100 m-auto">
     <div className="feed">    
<section className="py-5 text-center container">
  <div className="row py-lg-5">
    <div className="col-lg-6 col-md-8 mx-auto">
      <h1 className="fw-light">Jam Feed</h1>
      <p className="lead">Wondering what your friends are listening to? Look no further</p>
      <button className="btn-primary" > <Link to="/profile" className="nav-link" >Go to Profile</Link> </button>
      <button className="btn-primary" onClick={event => {
                            connectUsers() }}> Conect with Friends </button>

    </div>
  </div>
</section>

<div className="album py-5 bg-light">
  <div className="container-fluid">

    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
         
      <div className="col">
        <div className="card shadow-sm">
         <img src="data:image/jpeg;base64,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" className="img-fluid img-thumbnail" alt="img"/>
          <div className="card-body">
            <p className="card-text" style={{display:'flex', justifyContent:'left'}}>{name ? "Hi " + name + "! Your song of the day is": "you are not registered"}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary">View</button>              </div>
              <small className="text-muted">Posted 3 minutes ago</small>
            </div>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card shadow-sm">
        <img src="data:image/jpeg;base64,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" 
        className="img-fluid img-thumbnail" alt="..."/>
          <div className="card-body">
            <p className="card-text">Rachel's song of the day is Innerbloom by Rufus Du Sol</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary">View</button>              </div>
              <small className="text-muted">Posted 2 minutes ago</small>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card shadow-sm">
        <img src="data:image/jpeg;base64,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" className="img-fluid img-thumbnail" alt="..."></img>
          <div className="card-body">
            <p className="card-text">Bob's song of the day is Circles by Mac Miller</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary">View</button>              </div>
              <small className="text-muted">Posted 5 minutes ago</small>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card shadow-sm">
<img src="https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png" className="img-fluid img-thumbnail" alt="img"/>          <div className="card-body">
            <p className="card-text">Jack's song of the day is Bejeweled by Taylor Swift</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
              </div>
              <small className="text-muted">Posted 1 hour ago</small>
            </div>
          </div>
        </div>
      </div>
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
            <ListGroup.Item action onClick={alertClicked}>
            <div className="profile-picture"></div>
               user1
           </ListGroup.Item>
           <ListGroup.Item action onClick={alertClicked}>
           <div className="profile-picture"></div>
               user2
           </ListGroup.Item>
           <ListGroup.Item action onClick={alertClicked}>
           <div className="profile-picture"></div>
               user3
           </ListGroup.Item>
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