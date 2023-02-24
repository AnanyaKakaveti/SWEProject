import react from 'react';
import {Link} from "react-router-dom";

const Nav = () => {
    return (
<nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link to ="/" className="navbar-brand">JAM.</Link>
        
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item active">
              <Link to="/login" className="nav-link" aria-current="page">Login</Link>
            </li>
            <li className="nav-item active">
              <Link to="/Register" className="nav-link">Reg</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
};

export default Nav;