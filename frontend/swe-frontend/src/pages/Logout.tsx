import react from 'react';
import React, {SyntheticEvent, useState} from 'react';
import { Navigate } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {Link} from "react-router-dom";

const Logout = () => {

    return (
      <Container>
        <h1 className="text">Are you sure you want to logout?</h1>
        <Link to="/">
          <button className="w-100 btn btn-lg btn-primary" type="submit">Yes</button>
        </Link>
        <Link to= "/">
          <button className="w-100 btn btn-lg btn-primary" type="submit">No</button>
        </Link>
        <p className="mt-5 mb-3 text-muted">&copy; 2023</p>
      </Container>
    );
};

export default Logout;