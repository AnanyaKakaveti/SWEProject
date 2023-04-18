import react, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios'


type ProfileProps = {
    name: string
    email: string
}

export const Profile = (props: ProfileProps) => {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
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

    useEffect(() => {
        (
            async () => {
                console.log("email: " + email); 
                const r = await fetch(`http://localhost:8000/api/profile_posts/${email}`,{
                method: 'GET', 
                headers: {'Content-Type' : 'application/json'}, 
                credentials : 'include',
                })
                const c = await r.json(); 
                console.log(c);  // array per email 
            }
            
        )();

    });


    const deleteRow = async (email: string) => {
        // console.log(email)
        // deletes row in table user
        const response = await fetch(`http://localhost:8000/api/deleteuser/${email}`, {
            method: 'DELETE', 
            headers: {'Content-Type' : 'application/json'}, 
            credentials : 'include',
          })
            .then((response) => {
              // Handle successful response
              console.log("user deleted")
            })
            .catch((error) => {
              // Handle error response
              console.log("deletion unsuccessful", error)
            });
            // deletes cookie 
            await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'}, 
                credentials : 'include',
            });
      };

return(
    <main className="form-signin w-100 m-auto">
        {/* <div className="greeting">Welcome to your profile page</div> */}
        <div className="profile-picture"></div>

        <div className ="greeting">
        <h1> {name ? "Hi " + name + "!": "You are not logged in"}</h1> 

        <p> {email ? "Email: " + email : "No email is registered"}</p>
        
        <button className= "btn-primary"> <Link to="/feed" className="nav-link" >Go back to Feed</Link>  </button>

        <button className= "btn-primary mt-2" onClick = {() => deleteRow(email)}> <Link to="/" className = "nav-link"> Delete My Account</Link></button>

        </div>
    </main>
   
);
};

// export default Profile;