import React from 'react';
import ExitTo from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import { GoogleLogout } from "react-google-login";
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    exit:{
        padding: theme.spacing(0, 3),
        color:'white',
        '&:focus': {
          outline: 'none',
          color:'none',
          },
        float:'right',
    }
  }));

const Exit = ({ auth }) => {
    const classes=useStyles();
    return (
        <IconButton className={classes.exit} aria-label="exit">
              <ExitTo />
              <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sair"
            onLogoutSuccess={auth.logout}
            theme="dark"
        />
        </IconButton>
       
    )
};

export default Exit;
