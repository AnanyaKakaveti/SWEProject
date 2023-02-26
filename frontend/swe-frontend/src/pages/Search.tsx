import React, {SyntheticEvent, useState} from 'react'
import { Connect, SendMessage } from "../api";
import {Link} from "react-router-dom";


const Search = () => {

    const [song, setSong] = useState('');

const handleClick = () => { 
    console.log("present following feed");
};

const submit = (e: SyntheticEvent) => {
    e.preventDefault();

    console.log({
       song
    })
}

    return (

    <form onSubmit = {submit}>
        <h1 className="text" >Search for your song of the day</h1>
        <input type="song" className="form-control" id="floatingInput" placeholder="Search song" required/>

        <Link to="/feed">
            <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleClick}>submit song</button>
        </Link>  

    </form>

    

    );
};

export default Search;