import React, { useState } from 'react';
import styled from 'styled-components';
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

      <FormBox>
        <Grid>
          <span>Need to log in?</span>
          <Button onClick={() => history.push('/login')}>Login</Button>
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

            <Grid>
              <span>Who are you: </span>
              <select value={roleId} onChange={handleChange} name="roleId">
                <option defaultValue={1}>Buyer</option>
                <option value={2}>Seller</option>
              </select>
            </Grid>

            <Button type="submit">Create</Button>
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

export default Signup;
