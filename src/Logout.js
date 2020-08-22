import React, {useEffect} from 'react';
import { useAuth } from './useAuth';

const Logout = () => {
    const auth = useAuth();
    useEffect(() => {
        auth.logout();
    }, [auth])
    return (
        <div>
            
        </div>
    );
};

export default Logout;