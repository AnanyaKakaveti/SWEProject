import react from 'react';
import React, {SyntheticEvent, useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {Link} from "react-router-dom";


const Logout = () => {

  const [name, setName] = useState('');

  useEffect(() => { (
        async () => {
            const reponse = await fetch('http://localhost:8000/api/user', {
                headers: {'Content-Type' : 'application/json'}, 
                credentials : 'include',
            });
    
            const content = await reponse.json();
            setName(content.name);
            // setNameState(name);
            console.log(name);
            // console.log(content.name);
        } ) ();
      }, [])

    return (
      <Container>
        <div className = "w-100">
          <h1 className="text">Are you sure you want to logout?</h1>
          <Link to="/Login">
            <button className="w-100 btn btn-lg btn-primary my-1" type="submit">Yes</button>
          </Link>
          <Link to= "/">
            <button className="w-100 btn btn-lg btn-primary" type="submit">No</button>
          </Link>
          <p className="mt-5 mb-3 text-muted">&copy; 2023</p>
        </div>
      </Container>
    );
};

export default Logout;