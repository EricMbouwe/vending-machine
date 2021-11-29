import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Signup from './Signup.js';
import Login from './Login.js';
import Home from './components/Home';
import { fecthUserAsync } from './features/user/userSlice.js';

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthUserAsync());
  }, [dispatch]);

  const { status } = useSelector((state) => state.user);

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Signup} />
        <Route
          exact
          path="/"
          render={() =>
            status === 'success' ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/home"
          render={() =>
            status === 'success' ? <Home /> : <Redirect to="/login" />
          }
        />
      </Switch>
    </>
  );
};

export default Routes;
