import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import Nav from "./components/nav";
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Reg from "./pages/Reg";

import Search from "./pages/Search";


function App(){


const handleClick = () => { 
console.log("User logging in");
};

const [name, setName] = useState(''); 
useEffect(()=>{
    (
        async() =>{
            const response = await fetch('http://localhost:8000/api/user', { 
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
               }); 
              const content = await response.json(); 
              setName(content.name); 
        }
    )(); 
}); 


return(
     <div className="App">    
        <BrowserRouter>
        <Nav/>


        <main className="form-signin w-100 m-auto">
         <Routes>
            <Route path="/" element={ <Home/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Reg/>} />
            <Route path="/search" element={<Search/>} />
        </Routes>  
    </main>
    </BrowserRouter>
    {/* <button onClick={handleClick}>Hit</button> */}
      </div>

);

};

export default App;
