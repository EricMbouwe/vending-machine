import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from './features/user/userSlice';
import { Redirect, useHistory } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormFieldErrorStyle from './components/FormFieldErrorStyle';
import FormFieldStyle from './components/FormFieldStyle';

import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { status, errMessage } = useSelector((state) => state.user);

  if (status === 'success') {
    return <Redirect to="/home" />;
  }

  return (
    <div className="signup-container container px-4 m-auto max-w-lg">
      <h1 className="font-semibold text-center text-3xl mt-2">Sign Up</h1>

      <div className="google-auth bg-white my-5 px-5 py-[10px] border-gray-100 border-2 rounded-full">
        <div className="wrapper">
          <button className="w-full">
            <div className="flex items-center justify-center gap-8">
              <div className="google-icon">
                <FcGoogle />
              </div>
              <div className="text-blue-500">Sign up using Google</div>
            </div>
          </button>
        </div>
      </div>

      <div className="divider flex items-center mb-5">
        <span className="block bg-gray-400 w-full h-[1px]"></span>
        <span className="block mx-8">or</span>
        <span className="block bg-gray-400 w-full h-[1px]"></span>
      </div>

      <Formik
        initialValues={{ username: '', password: '', roleId: 1 }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(12, 'Username must be 12 characters or less')
            .required('Username is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            dispatch(registerUser(values));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white my-5 px-8 py-5 border-gray-100 border-2 rounded-xl">
            <h2 className="text-center my-4">Sign up using username</h2>

            <div className="mb-6">
              <Field
                type="text"
                name="username"
                placeholder="Username"
                as={FormFieldStyle}
              />
              <ErrorMessage name="username" component={FormFieldErrorStyle} />
            </div>

            <div className="mb-6">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                as={FormFieldStyle}
              />
              <ErrorMessage name="password" component={FormFieldErrorStyle} />
            </div>

            <div className="mb-6">
              <Field
                name="roleId"
                as="select"
                className="w-full text-xs outline-none border-[1px] rounded-[4px] py-2 px-4 bg-blue-50"
              >
                <option className="bg-white" value={1}>
                  Buyer
                </option>
                <option className="bg-white" value={2}>
                  Seller
                </option>
              </Field>
            </div>

            <button
              className="w-full mb-6 border-[1px] border-blue-700 rounded-[4px] bg-blue-700 text-white py-2 text-xs"
              type="submit"
              disabled={isSubmitting}
            >
              Create Your Account
            </button>
          </Form>
        )}
      </Formik>

      <div className="text-center mb-6">
        <span className="">Already have an account? </span>
        <button
          className="text-blue-600"
          onClick={() => history.push('/login')}
        >
          Log In
        </button>
      </div>

      {errMessage.length > 0 ? (
        <div className="w-10/12 mx-auto mb-6 text-center py-4 rounded-lg bg-red-400 text-white">
          {errMessage}
        </div>
      ) : null}
    </div>
  );
};

export default Signup;
