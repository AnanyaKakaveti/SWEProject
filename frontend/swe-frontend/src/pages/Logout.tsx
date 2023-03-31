import react, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";


export const Logout = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        (
            async () => {
                const reponse = await fetch('http://localhost:8000/api/user', {
                    headers: {'Content-Type' : 'application/json'}, 
                    credentials : 'include',
                });

                const content = await reponse.json();
                setName(content.name);
                setEmail(content.Email);
            }
        )();
    });

return(
    <main className="form-signin w-100 m-auto">
        <div className ="greeting">
            <h1>Are you sure you want to logout?</h1> 
            <p> {name ? "Name: " + name : "You are not logged in"}</p>
            <p> {email ? "Email: " + email : "You don''t have a registered email"}</p>
            
            <button className= "btn-primary"> Yes, Logout </button>
            <button className= "btn-primary my-2"> <Link to="/feed" className="nav-link" >Go back to Feed</Link>  </button>
        </div>
    </main>
   
);
};

export default Logout;