import react, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";


type ProfileProps = {
    name: string
    email: string
}
export const Profile = (props: ProfileProps) => {
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
        {/* <div className="greeting">Welcome to your profile page</div> */}
        <div className="profile-picture"></div>

        <div className ="greeting">
        <h1> {name ? "Hi " + name + "!": "You are not logged in"}</h1> 

        <p> {email ? "Email: " + email : "your email is amanda@gmail.com"}</p>
        
        <button className= "btn-primary"> <Link to="/feed" className="nav-link" >Go back to Feed</Link>  </button>
        <button className= "btn-primary mt-2"> Delete My Account (not functional)  </button>
        </div>
    </main>
   
);
};

// export default Profile;