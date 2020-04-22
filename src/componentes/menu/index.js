import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';


const useStyles = makeStyles({
    root: {
        background: '#242F40',
        color: '#ffffff',

    },
    item: {
        fontSize: '20px',
        '&:focus': {
            color: '#fff',
        },
        '&:hover': {
            color: '#fff',
        }

    },
});
function Menu({categories, handleSelectCategory}) {
    console.log(typeof(categories));
    console.log(categories);
    const classes = useStyles();
    return (
        <>
        <div>
            <MenuList className={classes.root}>
                {
                    categories.map((category) => (
                        <MenuItem className={classes.item}key={category._id} onClick={() => handleSelectCategory(category._id)}>
                            {category.name}
                        </MenuItem>
                    ))}
                    <MenuItem onClick={() => handleSelectCategory('settings')} className={classes.item}>
                    Configurações
                        </MenuItem>
            </MenuList>
        </div >
        </>
    )
}

export default Menu;