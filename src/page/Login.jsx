// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navTo = useNavigate(); 
  return(
  <div className='t-center m-200-0'>
    <h1>Zealnex Technologies</h1>
    <h2>Login</h2>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Required';
        } else if (
          !/^[A-Z0-9a-z!@#$%^&*()]{8,}$/i.test(values.password)
        ) {
          errors.password = 'Invalid Password';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
          axios.post('https://api.zealnex.com/dev-connect/v1/auth/login-with-email-password',{email:values.email,password:values.password}).then((res)=>{
            navTo("/");
          });
        
      }}
    >
      {({ isSubmitting }) => (
        <div>
          <Form>
          <Field type="email" placeholder="Email" name="email" />
          <ErrorMessage name="email" component="div" />
          <br />
          <Field type="text" placeholder="Password" name="password" />
          <ErrorMessage name="password" component="div" />
          <br />
          <a onClick={() => navTo("/forget_password")} className='f-left bluee'>Forget Password?</a>
          <br/>
          <button className='primary' type="submit">
            Login
          </button>
          <p>Looking to register <a className='bluee' onClick={() => navTo('/register')}>sign Up?</a></p>
          
        </Form>
        </div>
        
      )}
    </Formik>
  </div>
)};

export default LoginPage;