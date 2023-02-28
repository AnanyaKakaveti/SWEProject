import React, {useEffect, useState} from 'react';

const Search = () => {
    const [name, setName] = useState('');

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
        <div className = "artists">
            {name ? "Hi " + name : "You are not logged in"}
        </div>
    </form>
    
    );
};

export default Search;