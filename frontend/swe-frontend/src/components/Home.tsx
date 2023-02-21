import React from 'react'
import Typed from 'react-typed';


const Home: React.FC = () => {
    return (
        <div>
          <div className="style">JAM.</div>  
          <div className= 'flex justify-center items-center'>
            <p className="slogan">
                The platform that connects music to people.
            </p>
            <Typed 
            className= "artists" 
            strings = {['Taylor Swift', 'Michael Jackson', 'The Weeknd', 'Queen', 'Justin Bieber', 'Madonna', 'The Beatles', 'BTS']} 
            typeSpeed={80} 
            backSpeed={70} 
            // startDelay={200} 
            // backDelay={200} 
            loop/>
            </div>
            
        </div>
    );
};

export default Home;