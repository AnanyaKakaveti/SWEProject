import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import { Connect, SendMessage } from "./api";
import Nav from "./components/nav";
import Home from "./components/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Reg from "./Reg";


function App(){

useEffect(() => {
Connect();
}, []);

const handleClick = () => { 
console.log("User loging in");
SendMessage("User loging in");
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
            <Route path="/" element={ <Home name = {name}/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/Register" element={<Reg/>} />
            </Routes>  
    </main>
    </BrowserRouter>
    {/* <button onClick={handleClick}>Hit</button> */}
        </div>
);
};

export default App;
