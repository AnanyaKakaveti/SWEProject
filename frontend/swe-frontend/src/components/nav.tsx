import react from 'react';
import React, {useState} from 'react';

import {Link} from "react-router-dom";
// let menu;

interface NavProps {
  nameState: (param: string) => void
}

const Nav: React.FC<NavProps> = ({nameState}) => {


  

    return (
<nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link to ="/" className="navbar-brand">JAM.</Link>
        <div>
          {/* {menu} */}
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item active">
              <Link to="/login" className="nav-link" aria-current="page">Login</Link>
            </li>
            <li className="nav-item active">
              <Link to="/Register" className="nav-link" >Register</Link>
           
            </li>
            <li className="nav-item active">
              <div className="nav-link">
                {"Welcome " + nameState + "!"}
              </div>
            </li>
      </ul>
        </div>
      </div>
    </nav>
    );
};

export default Nav;