import React, { useState, useEffect } from "react";
import "./App.css";
import { Connect, SendMessage } from "./api";

const App: React.FC = () => {
useEffect(() => {
Connect();
}, []);

const handleClick = () => {
console.log("user loging in...");
SendMessage("user loging in...");
};

return (
<div className="App">
<button onClick={handleClick}>Hit</button>
</div>
);
};

export default App;