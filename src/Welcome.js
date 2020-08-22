import React from 'react';
import './Welcome.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
const Welcome = () => {
    return (
        <div className="welcome">
            <TwitterIcon className="twitter" fontSize="large"/>
            <h2>See what's happening in <br/> the world right now</h2>
            <h4>Join Twitter Today</h4>
            <Link to="/signup"><Button className="signup">Sign up</Button></Link>
            <br/>
            <Link to="/login"><Button className="login">Login</Button></Link>
        </div>
    );
};

export default Welcome;