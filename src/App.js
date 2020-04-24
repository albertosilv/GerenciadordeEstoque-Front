import React from 'react';
import { Route, useHistory, Switch, Redirect } from 'react-router-dom';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Auth from "./Auth/Auth";

function App() {
  const history = useHistory();
  const auth = new Auth(history);

  return (
    <Switch>
      <Route
        exact
        path='/'
        render={(props) => <Login auth={auth} {...props} />}
      />
      <Route
        path='/dashboard'
        render={(props) => auth.isAuthenticated() ? <Dashboard {...props} auth={auth} /> : <Redirect to='/' />}
      />
    </Switch>
  )
}

//1587760940710

export default App;

