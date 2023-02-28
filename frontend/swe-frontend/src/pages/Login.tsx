import react from 'react';
import React, {SyntheticEvent, useState} from 'react';
import { Navigate } from 'react-router-dom';
import {Link} from "react-router-dom";
import Nav , { NavProps }  from "../components/nav";


interface LoginProps {
  navProps: NavProps; // Pass NavProps down to Nav component
}

//const Login = () => {
  const Login: React.FC<LoginProps> = ({ navProps }) =>{
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e:SyntheticEvent) =>{
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'}, 
            credentials : 'include',
            body: JSON.stringify({ 
                email, 
                password
            })
        });
    const content = await response.json();
    console.log(content);
    setRedirect(true);
  }

  if(redirect)
  return <Navigate to= "/search"/>;
  

  return (

    <form onSubmit = {submit}>
        <h1 className="text">Welcome to JAM. Sign in below</h1>

        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required
            onChange = {e=>setEmail(e.target.value)}
          />
       
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
            onChange = {e=>setPassword(e.target.value)}
          />
          {/* {isVisible ? "Hide" : "Show"} Navigation Bar */}
       <Link  to="/search">
        <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={() => setIsVisible(!isVisible)}>Sign in </button>
        </Link>
        {/* {isVisible && <Nav {...navProps} />} */}
        {/* <Nav {...navProps} isVisible={!isVisible} /> */}
        <p className="mt-5 mb-3 text-muted">&copy; 2023</p>
      </form>
    );
};

export default Login;

