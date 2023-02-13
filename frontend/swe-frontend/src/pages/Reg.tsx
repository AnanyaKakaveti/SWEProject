import React, {SyntheticEvent, useState} from 'react'
import { Connect, SendMessage } from "../api";
import {Link} from "react-router-dom";
// import Button from "react-bootstrap/Button";

const Reg = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => { 
        console.log("User logging in");
        SendMessage("User logging in");
             
    };

        
    const submit = (e: SyntheticEvent) => {
        e.preventDefault();

        console.log({
            name,
            email,
            password
        })
    }
    return (
        <form onSubmit = {submit}>
        <h1 className="text">Welcome to JAM. Sign up below</h1>
        <input type="name" className="form-control" id="floatingInput" placeholder="Username" required
                        onChange = {e => setName(e.target.value)}/>
                     

          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required
                onChange = {e => setEmail(e.target.value)}/>
       
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
            onChange = {e => setPassword(e.target.value)}/>
               
        <Link to="/Post">
            <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleClick}>Sign in</button>
        </Link>    
        
             
        <p className="mt-5 mb-3 text-muted">&copy; 2023</p>
      </form>
    );
};

export default Reg;