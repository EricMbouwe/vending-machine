import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Signup from './Signup.js';
import Login from './Login.js';
import Home from './components/Home';

const Routes = () => {
  const { data: user, status } = useSelector((state) => state.user);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Signup} />
        <Route
          exact
          path="/"
          render={() => (user?.id ? <Home /> : <Login />)}
        />
        <Route
          exact
          path="/home"
          render={() => (user?.id ? <Home /> : <Login />)}
        />
      </Switch>
    </>
  );
};

export default Routes;
