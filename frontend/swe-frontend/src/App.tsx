import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import { Connect, SendMessage } from "./api";
import Nav from "./components/nav";
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Reg from "./pages/Reg";

import Search from "./pages/Search";


function App(){

useEffect(() => {
Connect();
}, []);

const handleClick = () => { 
console.log("User logging in");
SendMessage("User logging in");
};

return(
     <div className="App">    
        <BrowserRouter>
        <Nav/>
        <main className="form-signin w-100 m-auto">
         <Routes>
            <Route path="/" element={<Home/>} />
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
