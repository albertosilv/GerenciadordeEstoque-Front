import React from 'react';
import Exit from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import { withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const styles = theme =>({
    exit:{
        padding: theme.spacing(0, 3),
        color:'white',
        '&:focus': {
          outline: 'none',
          color:'none',
        }
    }
});

class exit extends React.Component{
    render(){
        const {classes}= this.props;
        return (
            <IconButton className={classes.exit} aria-label="exit">
              <Exit />
            </IconButton>
        )
    }
};
exit.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(exit);