import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LogoutButton = () => {
    const {logout} = useAuth0();
    return (
        <button onClick={() => logout({returnTo: window.location.origin})} 
        style={{fontSize:"50%",width:"6%" ,height:"4%",display: "flex",justifyContent: "center", alignItems: "center", position:"absolute", right: "6%",top: "10%"}}>LOGOUT</button>
    );
};

