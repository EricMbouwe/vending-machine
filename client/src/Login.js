import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from './features/user/userSlice';
import { Redirect, useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { data: user } = useSelector((state) => state.user);
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const { username, password } = state;

  const handleRegister = async (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  if (user?.id) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <h1 className="">LOGIN PAGE</h1>

      <div>
        <div className="">
          <span className="">Need to register?</span>
          <button onClick={() => history.push('/register')}>Register</button>
        </div>

        <form onSubmit={handleRegister}>
          <div>
            <div>
              <div>
                <input
                  aria-label="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  type="text"
                  placeholder="Username"
                  required
                />
              </div>
            </div>

            <div>
              <div>
                <input
                  aria-label="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  minLength="6"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button className="" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
