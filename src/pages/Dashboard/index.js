import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu';
import Api from '../../services/api';
import Products from '../../components/ProductsTable';
import Settings from '../../components/Settings'
import makeStyles from '@material-ui/core/styles/makeStyles';
import Exit from '../../components/ExitIcon';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  exit: {
    float: 'right',     
    padding: theme.spacing(0, 10)

  }
}));

function Dashboard({ auth }) {
  const [categories, setCategories] = useState([]);
  const [Option, setOption] = useState(null);

  useEffect(() => {
    Api.get('categorias/')
      .then((response) => setCategories(response.data))
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = (bol) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(bol);
  };
  function handleSelect(id) {
    if (id === 'settings') {
      setOption('settings');
    }
    else {
      setOption(...categories.filter((category) => category._id === id));
    }
  }
  function attCategory(category) {
    Api.get('categorias/')
      .then((response) => setCategories(response.data));

  }
  function Select() {
    if (Option === 'settings') return <Settings attCategory={attCategory}  />;
    else {
      return <Products category={Option} />
    };
  }
  return (
    <div className={classes.grid}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position={'absolute'}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography style={{ flex: 1 }} variant="h6" noWrap>
              Gerenciador de Estoque
          </Typography>
            <Exit auth={auth} />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}>
            <Menu handleSelectCategory={handleSelect} categories={categories} />
          </div>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Select />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

