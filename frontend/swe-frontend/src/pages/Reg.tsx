import React, {SyntheticEvent, useState} from 'react'
import { Navigate } from 'react-router-dom';
import {Link} from "react-router-dom";
 //import { Connect, SendMessage } from "./api";

const Reg = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleClick = () => { 
        console.log("User loging in");
       
        // SendMessage("User loging in");
        };

        
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'}, 
            body: JSON.stringify({
                name, 
                email, 
                password
            })
        });

        const content = await response.json();
        console.log(content);


        setRedirect(true);
    
    }
     
    if(redirect)
    return <Navigate to= "/login"/>;

    return (
        <form onSubmit = {submit}>
        <h1 className="text">Welcome to JAM. Sign in below</h1>
        <input type="name" className="form-control" id="floatingInput" placeholder="First Last" required
                        onChange = {e => setName(e.target.value)}/>
                     

          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required
                onChange = {e => setEmail(e.target.value)}/>
       
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
            onChange = {e => setPassword(e.target.value)}/>
 <Link to="/login">
        <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleClick}>Sign in </button>
        </Link>
        <p className="mt-5 mb-3 text-muted">&copy; 2023</p>
      </form>
    );
};

export default Reg;