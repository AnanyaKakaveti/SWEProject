import React, { useEffect, useState } from 'react'


const Home  = (props:{name : string}) => {

    return (
        <div>
          <div className="style">JAM.</div>  
      
        <p className="slogan">
            the platform to connect music to people
            <div>{props.name ? 'Hi ' + props.name: 'You are not logged in'}</div>
        </p>
        </div>
    );
};

export default Home;