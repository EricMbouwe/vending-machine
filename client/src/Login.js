import React, { useState } from 'react';
import styled from 'styled-components';
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
      <h1>LOGIN PAGE</h1>

      <FormBox>
        <Grid>
          <span>Need to register?</span>
          <Button onClick={() => history.push('/register')}>Register</Button>
        </Grid>

        <form onSubmit={handleRegister}>
          <Grid>
            <Grid>
              <FormControl>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  type="text"
                  placeholder="Username"
                  required
                />
              </FormControl>
            </Grid>

            <Grid>
              <FormControl>
                <TextField
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
              </FormControl>
            </Grid>

            <Button type="submit">Login</Button>
          </Grid>
        </form>
      </FormBox>
    </div>
  );
}

const FormBox = styled.div``;

const Grid = styled.div`
  margin: 0.5rem 0;
`;

const FormControl = styled.div``;

const TextField = styled.input``;

const Button = styled.button`
  cursor: pointer;
`;

export default Login;
