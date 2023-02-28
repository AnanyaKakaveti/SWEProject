import React from 'react'
import { Link } from 'react-router-dom'

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer">
        <div className="socialMedia">
            <LinkedInIcon onClick={() => window.open('https://www.linkedin.com/in/ananya-kakaveti-961897221/')}/>
            <GitHubIcon onClick={() => window.open('https://github.com/ananyakakaveti')}/>
            {/* <EmailIcon onClick={() => window.location = 'mailto:annniek19@gmail.com'}/> */}
    
        </div>
        <p> &copy; 2023 annieisthebest.com</p>
    </div>
  )
}

export default Footer