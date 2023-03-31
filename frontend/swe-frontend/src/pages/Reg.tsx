import React, {SyntheticEvent, useState} from 'react'
import { ModalBody } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import {Link} from "react-router-dom";

 //import { Connect, SendMessage } from "./api";

const Reg = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const randomID = "2aPTvyE09vUCRwVvj0I8WK";
    var [song, setSong] = useState('');
    

    const handleClick = () => { 
        console.log("User loging in");
        // SendMessage("User loging in");
        };

        
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        // song = song + randomID
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'}, 
            body: JSON.stringify({
                name, 
                email, 
                password, 
                song,
            })
        });

        const content = await response.json();
        console.log(content);
        console.log(content.song)


        setRedirect(true);
    
    }
     
    if(redirect)
    return <Navigate to= "/login"/>;

    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit = {submit}>
            <h1 className="text">Welcome to JAM. Sign in below</h1>
            <input type="name" className="form-control" id="floatingInput" placeholder="First Last" required
                            onChange = {e => setName(e.target.value)}/>
                        
            {/* <Search name = 'Amanda' /> */}
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required
                    onChange = {e => {
                        setEmail(e.target.value);
                    }}/>
        
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
                onChange = {e => setPassword(e.target.value)}/>
    {/* <Link to="/login"> */}
            <button className="btn-primary" type="submit" onClick={handleClick}>Sign in </button>
            {/* </Link> */}
            {/* <p className="mt-5 mb-3 text-muted">&copy; 2023</p> */}
        </form>
        <div className ="space"></div>
      </main>
    );
};

export default Reg;