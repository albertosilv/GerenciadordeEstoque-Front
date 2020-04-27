import React from 'react';
import GoogleLogin from 'react-google-login';

function Login({ auth }) {

  const responseGoogle = (response) => {
    const expires_at = response.tokenObj.expires_at;
    const id_token = response.tokenObj.id_token;
    const userProfile = response.profileObj;

    auth.login({ expires_at, id_token, userProfile });
  };

  return (
    <GoogleLogin
      buttonText="Fazer login com Google"
      clientId="86796554590-gt3o70mtm8qq35lebu0enu6k7nvc2arg.apps.googleusercontent.com"
      onSuccess={responseGoogle}
      onFailure={(error) => alert(`Não foi possível fazer o login usando o Google! ${error}`)}
      theme="dark"
    />
  )
}

export default Login;
