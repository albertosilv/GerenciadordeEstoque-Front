import React from 'react';
import GoogleLogin from 'react-google-login';
import Grid from '@material-ui/core/Grid';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  login: {
    '&:focus': {
      outline: 'none',
      color: 'none',
    },
  
  },
  icon:{
    fontSize:'100px'
  }
}));


function Login({ auth }) {

  const responseGoogle = (response) => {
    const expires_at = response.tokenObj.expires_at;
    const id_token = response.tokenObj.id_token;
    const userProfile = response.profileObj;

    auth.login({ expires_at, id_token, userProfile });
  };
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh'}}
      >

        <Grid item spacing={10} className={classes.grid}  xs={12}>
        <AccountCircleIcon fontSize="large" className={classes.icon} color={'primary'} />
          
        </Grid>
        <Grid item spacing={10} className={classes.grid} xs={12}>
        <GoogleLogin
            buttonText=" Logar "
            className={classes.login}
            clientId="86796554590-gt3o70mtm8qq35lebu0enu6k7nvc2arg.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={(error) => console.log(`Não foi possível fazer o login usando o Google! ${error}`)}
            theme="dark"
          />
        </Grid>


      </Grid>

    </div>
  )
}

export default Login;
