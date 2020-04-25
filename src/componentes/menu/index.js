import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';


const useStyles = makeStyles({
    root: {
        //background: '#242F40',
        background: '#232232',

        color: '#ffffff',
        height:'100%'

    },
    item: {
        fontSize: '3vh',
        '&:focus': {
            color: '#fff',
        },
        '&:hover': {
            color: '#fff',
        }

    },
});
function Menu({ categories, handleSelectCategory }) {
    console.log(typeof (categories));
    console.log(categories);
    const classes = useStyles();
    return (
        <>
            <div className={classes.lateral}>
                <div className={classes.menu}>
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