import React from 'react';
import { GoogleLogout } from "react-google-login";
import ExitTo from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    exit: {
        float: 'right',
        padding: theme.spacing(0, 3),
        color: 'white',
        '&:focus': {
            outline: 'none',
            color: 'none',
        },

    },
    div: {
        float: 'right'
    }
}));



const Exit = ({ auth }) => {
    const classes = useStyles();
    return (

        <div className={classes.div}>
            <GoogleLogout className={classes.exit}
                clientId="1043532048097-gp36ja8qk1ltvq402rs4so1lu0lc1dp6.apps.googleusercontent.com"
                buttonText="Sair"
                onLogoutSuccess={() => auth.logout()}
                theme="dark"
                render={renderProps => (
                    <IconButton className={classes.exit} aria-label="exit" onClick={renderProps.onClick}>
                        <ExitTo />
                    </IconButton>
                )}

            />
        </div>
    )
}

export default Exit;
