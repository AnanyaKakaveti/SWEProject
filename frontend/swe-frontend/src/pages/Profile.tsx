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
    <div className ="greeting">
   <h1> {name ? "Hi " + name + " Welcome to your profile page": "You are not logged in"}</h1> 
    <p> {email ? "Email: " + email : "your email is amanda@gmail.com"}</p>
    
    <button className= "btn-primary"> <Link to="/Feed" className="nav-link" >Go back to Feed</Link>  </button>
    </div>
   
);
};

// export default Profile;