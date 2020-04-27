import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';


const useStyles = makeStyles({
    root: {
        height:'100%'
    },
    item: {
        fontSize: '2vh',
    },
});
function Menu({ categories, handleSelectCategory }) {
    const classes = useStyles();
    return (
        <>
            <div>
                <div>
                    <MenuList className={classes.root}>
                        {
                            categories.map((category) => (
                                <MenuItem className={classes.item} key={category._id} onClick={() => handleSelectCategory(category._id)}>
                                    {category.name.toUpperCase()}
                                </MenuItem>
                            ))}
                        <MenuItem onClick={() => handleSelectCategory('settings')} className={classes.item}>
                            CONFIGURAÇÕES
                        </MenuItem>
                    </MenuList>
                </div >
            </div>
        </>
    )
}

export default Menu;
