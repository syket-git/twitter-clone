import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
const NotFound = () => {
    return (
        <div style={{width: '100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <TwitterIcon style={{color: 'var(--twitter-color)', fontSize: '50px'}} fontSize="large" />
            <h1>Not Found!</h1>
        </div>
    );
};

export default NotFound;