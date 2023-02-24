import React, {SyntheticEvent, useState} from 'react'
import {Link} from "react-router-dom";
// import Button from "react-bootstrap/Button";

const Reg = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => { 
        console.log("User logging in");
             
    };

        
    const submit = async(e: SyntheticEvent) => {
        e.preventDefault();

        // console.log({
        //     name,
        //     email,
        //     password
        // })

        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST', 
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                name, 
                email, 
                password
            })
        }); 
        // const content = await response.json(); 
        // console.log(content)
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
               
        <Link to="/search">
            <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleClick}>Sign in</button>
        </Link>    
        
             
        <p className="mt-5 mb-3 text-muted">&copy; 2023</p>
      </form>
    );
};

export default Reg;