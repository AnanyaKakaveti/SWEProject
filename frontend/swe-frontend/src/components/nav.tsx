import react, { useEffect } from 'react';
import React, {useState} from 'react';
import {Link} from "react-router-dom";
// let menu;

interface NavProps {
  nameState: string;
}

interface NavProps2 {
  name: string
}



const Nav: React.FC<NavProps> = ({nameState}) => {
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
<nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link to ="/" className="navbar-brand">JAM.</Link>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {name ? <LoggedIn name = {name}/> : <LoggedOut/>}
          </ul>
        </div>
      </div> 
    </nav>
    );
};

export default Nav;

const LoggedOut = () => {
  return (
    
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item active">
            <Link to="/login" className="nav-link" aria-current="page">Login</Link>
        </li>
        <li className="nav-item active">
            <Link to="/Register" className="nav-link" >Register</Link>
        </li>
      </ul>
    
  )
}

const LoggedIn: React.FC <NavProps2> = ({name}) => {
  return (
    
    <li className="nav-link">
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item active">
            {"Welcome " + name + "!"}
        </li>
        <li className="nav-item active">
            <Link to="/Logout" className="nav-link" >Logout</Link>
        </li>
      </ul>
    </li>
  )
}