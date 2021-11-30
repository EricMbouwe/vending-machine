import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from './features/user/userSlice';
import { Redirect, useHistory } from 'react-router-dom';

import { FcGoogle } from 'react-icons/fc';

import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { status, errMessage } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(12, 'Username must be 12 characters or less')
        .required('Username is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: ({ username, password }) =>
      dispatch(loginUser({ username, password })),
  });

  if (status === 'success') {
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
          onSubmit={formik.handleSubmit}
          className="bg-white my-5 px-8 py-5 border-gray-100 border-2 rounded-xl"
        >
          <h2 className="text-center my-4">Log in using username</h2>

          <div>
            <div className="mb-6">
              <input
                className="w-full text-xs outline-none border-[1px] rounded-[4px] py-2 px-4 bg-blue-50"
                type="text"
                placeholder="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-600 mt-2 text-xs text-right">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>

            <div className="mb-6">
              <input
                className="w-full text-xs outline-none border-[1px] rounded-[4px] py-2 px-4 bg-blue-50"
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600 mt-2 text-xs text-right">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <button
              className="w-full mb-6 border-[1px] border-blue-700 rounded-[4px] bg-blue-700 text-white py-2 text-xs"
              type="submit"
            >
              Log in
            </button>
          </div>
        </form>

        <div className="text-center mb-6">
          <span className="">Need to create an account? </span>
          <button
            className="text-blue-600"
            onClick={() => history.push('/register')}
          >
            Sign Up
          </button>
        </div>

        {errMessage.length > 0 ? (
          <div className="w-10/12 mx-auto mb-6 text-center py-4 rounded-lg bg-red-400 text-white">
            {errMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Login;
