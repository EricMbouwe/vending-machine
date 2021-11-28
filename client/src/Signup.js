import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from './features/user/userSlice';
import { Redirect, useHistory } from 'react-router-dom';

function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { data: user } = useSelector((state) => state.user);
  const [state, setState] = useState({
    username: '',
    password: '',
    roleId: 1,
  });

  const { username, password, roleId } = state;

  const handleRegister = async (event) => {
    event.preventDefault();
    dispatch(registerUser({ username, password, roleId }));
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
      <h1>SIGN UP PAGE</h1>

      <div>
        <div>
          <span>Need to log in?</span>
          <button onClick={() => history.push('/login')}>Login</button>
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

            <div>
              <span>Who are you: </span>
              <select value={roleId} onChange={handleChange} name="roleId">
                <option defaultValue={1}>Buyer</option>
                <option value={2}>Seller</option>
              </select>
            </div>

            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
