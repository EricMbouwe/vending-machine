import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fecthUserAsync } from './features/user/userSlice';
import Signup from './Signup.js';
import Login from './Login.js';
import Home from './components/Home';

const Routes = () => {
  const { data: user, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthUserAsync());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  console.log('USER', user);

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
