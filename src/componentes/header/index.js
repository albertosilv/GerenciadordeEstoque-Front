import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Search from '../search'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Exit from '../exit';


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,

  },

});
class header extends React.Component {
  render() {
    const { classes, auth } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ background: '#2E3B55' }}>
          <Toolbar>
            <Typography className={classes.title} variant="h5" align="center" position="fixed" noWrap>
              Gerenciador de Estoque
          </Typography>
            <Search />
            <Exit auth={auth} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(header);