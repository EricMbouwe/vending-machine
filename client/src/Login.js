import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from './features/user/userSlice';
import { Link, Redirect, useHistory } from 'react-router-dom';

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
      <div className="login-container container px-4 m-auto max-w-lg">
        <h1 className="font-semibold text-center text-3xl mt-2">Log In</h1>

        <div className="google-auth bg-white my-5 px-5 py-[10px] border-gray-100 border-2 rounded-full">
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
          className="bg-white my-5 px-8 py-5 border-gray-100 border-2 rounded-xl"
        >
          <h2 className="text-center my-4">Log in using email address</h2>

          <div>
            <div className="mb-6">
              <input
                className="w-full outline-none border-[1px] rounded-[4px] py-2 px-4 bg-blue-50"
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

            <div className="mb-6">
              <input
                className="w-full outline-none border-[1px] rounded-[4px] py-2 px-4 bg-blue-50"
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

            <button
              className="w-full mb-6 rounded-[4px] bg-blue-700 text-white py-[10px] text-xs"
              type="submit"
            >
              Log in
            </button>
          </div>
        </form>

        <div className="text-center">
          <span className="">Need to create an account? </span>
          <button
            className="text-blue-600"
            onClick={() => history.push('/register')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
