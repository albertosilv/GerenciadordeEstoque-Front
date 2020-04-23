import React, { useState, useEffect } from 'react';
import Header from './componentes/header';
import Menu from './componentes/menu';
import Api from './componentes/server/index';
import Products from './componentes/Products';
import Settings from './componentes/settings'
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles(theme => ({
  grid: {
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    border: 'none',
    flexGrow: 0,
  },

}));

function App() {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [Option, setOption] = useState(null);

  useEffect(() => {
    Api.get('categorias/')
      .then((response) => setCategories(response.data))
  }, []);

  useEffect(() => {

  }, [Option]);

  function handleSelect(id) {
    if (id === 'settings') {
      setOption('settings');
    }
    else {
      setOption(...categories.filter((category) => category._id === id));
    }

  }
  function Select() {
    if (Option === 'settings') return <Settings />;
    else {
      return <Products category={Option} />
    };
  }
  return (
    <div className={classes.grid}>
      <Grid container spacing={0} className={classes.grid}>
        <Header />
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item xs={3} className={classes.grid}>
          <Menu handleSelectCategory={handleSelect} categories={categories} />
        </Grid>
        <Grid item xs >
          <Select />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

