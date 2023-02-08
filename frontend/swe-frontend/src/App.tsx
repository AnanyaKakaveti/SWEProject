import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import { Connect, SendMessage } from "./api";
import Nav from "./components/nav";
import Home from "./components/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./components/Register";


function App(){

useEffect(() => {
Connect();
}, []);

const handleClick = () => { 
console.log("hello");
SendMessage("hello");
};

return(
     <div className="App">    
        <BrowserRouter>
        <Nav/>
        <main className="form-signin w-100 m-auto">
         <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/Register" element={<Register/>} />
            </Routes>  
    </main>
    </BrowserRouter>
    <button onClick={handleClick}>Hit</button>
        </div>
);
};

export default App;
