
// import React, {SyntheticEvent, useState} from 'react'
// import {Link} from "react-router-dom";


// const Search = () => {

//     const [song, setSong] = useState('');

// const handleClick = () => { 
//     console.log("present following feed");
// };

// const submit = (e: SyntheticEvent) => {
//     e.preventDefault();

//     console.log({
//        song
//     })
// }

//     return (

//     <form onSubmit = {submit}>
//         <h1 className="text" >Search for your song of the day</h1>
//         <input type="song" className="form-control" id="floatingInput" placeholder="Search song" required/>

//         <Link to="/feed">
//             <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleClick}>submit song</button>
//         </Link>  

//     </form>

    


import React, { useEffect, SyntheticEvent, useState} from 'react';
import {Link} from "react-router-dom";


const Search = () => {
    const [name, setName] = useState('');

    const handleClick = () => { 
    console.log("present following feed");
};
const [song, setSong] = useState('');

const submit = (e: SyntheticEvent) => {
    e.preventDefault();

    console.log({
       song
    })
}

    useEffect(() => {
        (
            async () => {
                const reponse = await fetch('http://localhost:8000/api/user', {
                    headers: {'Content-Type' : 'application/json'}, 
                    credentials : 'include',
                });

                const content = await reponse.json();
                setName(content.name);
            }
        )();
    });

    return (

    <form>
        <h1 className="text" >Song picker</h1>
        <input type="name" className="form-control" id="floatingInput" placeholder="Search song" required/>
        <div>
            {name ? "Hi " + name : "You are not logged in"}
        </div>
        <Link to="/feed">
//             <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleClick}>submit song</button>
//         </Link>  
    </form>
    
     );
 };

export default Search;