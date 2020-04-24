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
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={responseGoogle}
      onFailure={(error) => alert(`Não foi possível fazer o login usando o Google! ${error}`)}
      theme="dark"
    />
  )
}

export default Login;
