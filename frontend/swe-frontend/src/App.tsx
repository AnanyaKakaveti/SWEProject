import React, { useState, useEffect } from "react";
// import Axios from 'axios'
import "./App.css";
import Login from "./pages/Login";
import Nav from "./components/nav";
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Reg from "./pages/Reg";
import Feed from "./pages/Feed";
import Search from "./pages/Search";
import {Profile} from "./pages/Profile";
import Footer from "./components/Footer";

interface AppProps{

}
function App(){
// const App: React.FC<AppProps> = () => {
useEffect(() => {

}, []);

const handleClick = () => { 
console.log("User logging in");
};

// const navProps = {
//   // set the properties of the navProps object here
//   isVisible: false
// };



return(
     <div className="App">    
        <BrowserRouter>
        <Nav/>

        {/* name = {name} setName = {setName} */}
        
        <main className="form-signin w-100 m-auto">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Reg/>} />
            <Route path="/search" element={<Search/>} />
            <Route path="/feed" element={<Feed/>} />
            <Route path="/profile" element={<Profile name = "name" email="email" />} />
        </Routes>  
        <Footer/>
        </main>
        <Footer/>
    </BrowserRouter>
    {/* <button onClick={handleClick}>Hit</button> */}
        </div>
);
};

export default App;
