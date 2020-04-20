import Api from '../server/api';
import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Settings from '../settings';

const styles= () => ({
    root: {
        width: '230px',
        background: '#242F40',
        color:'#ffffff',
        
    },
    item:{
        fontSize:'20px',
    }
});  
class menu extends React.Component {
    state = {
        persons: []
    }

    componentDidMount() {
        Api.get(`categorias/get`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
    }
    render() {
        const { classes } = this.props;
        return(  
                    <MenuList className={classes.root}>
                        {this.state.persons.map(person => <MenuItem className={classes.item}>
                             {person.name}
                        </MenuItem>
                        )
                        }
                        <MenuItem className={classes.item}>Configuração</MenuItem>
                    </MenuList>
        )
    }
}
menu.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(menu);
