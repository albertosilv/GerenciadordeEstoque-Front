import React from 'react';
import { GoogleLogout } from "react-google-login";

const Exit = ({ auth }) => {
    return (
        <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sair"
            onLogoutSuccess={auth.logout}
            theme="dark"
        />
    )
};

export default Exit;
