import React from 'react';
import { GoogleLogout } from "react-google-login";

const Exit = ({ auth }) => {
    return (
        <GoogleLogout
            clientId="86796554590-gt3o70mtm8qq35lebu0enu6k7nvc2arg.apps.googleusercontent.com"
            buttonText="Sair"
            onLogoutSuccess={auth.logout}
            theme="dark"
        />
    )
};

export default Exit;
