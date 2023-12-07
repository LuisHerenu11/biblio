import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const Profile = () => {
    const {user,isAuthenticated,isLoading} = useAuth0();

    if(isLoading){
        return <div>Cargando...</div>
    }

    return (
        isAuthenticated && (
            <div style={{width:"30%" ,height:"15%",display: "flex",justifyContent: "flex-end", alignItems: "center", position:"absolute", right: "0px",top: "0px"}}>
                <p style={{fontSize:"small"}}>{user.email}</p>
                <img src={user.picture} alt={user.name} style={{width:"15%", marginTop: "1%", marginRight:"1%"}}></img> 
            </div>
        )
    );
};