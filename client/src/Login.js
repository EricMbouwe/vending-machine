import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from './features/user/userSlice';
import { Redirect, useHistory } from 'react-router-dom';

import { FcGoogle } from 'react-icons/fc';

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { data: user } = useSelector((state) => state.user);
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const { username, password } = state;

  const handleLogin = async (event) => {
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
      <div className="login-container container px-4">
        <h1 className="font-semibold text-center text-3xl mt-2">Log In</h1>

        <div className="google-auth bg-white my-5 px-5 py-[10px] border-gray-100 border-[1px] rounded-full">
          <div className="wrapper">
            <button className="w-full">
              <div className="flex items-center justify-center gap-8">
                <div className="google-icon">
                  <FcGoogle />
                </div>
                <div className="text-blue-500">Log In using Google</div>
              </div>
            </button>
          </div>
        </div>

        <div className="divider flex items-center mb-5">
          <span className="block bg-gray-400 w-full h-[1px]"></span>
          <span className="block mx-8">or</span>
          <span className="block bg-gray-400 w-full h-[1px]"></span>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white my-5 px-5 py-[10px] border-gray-100 border-[1px] rounded-md"
        >
          <h2 className="text-center my-4">
            log in using email <address></address>
          </h2>

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

            <button className="" type="submit">
              Login
            </button>
          </div>
        </form>

        <div className="">
          <span className="">Need to create an account? </span>
          <button onClick={() => history.push('/register')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
