// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../Component/nav';

const ChangePasswordPage = () => {
  const navTo = useNavigate();
  return (<>
    <Nav />
  <div className='t-center m-200-0'>
  <h1>Zealnex Technologies</h1>
  <h2>Change Password</h2>
    <Formik
      initialValues={{ email: '', password: '',confirmPassword: '', newPassword:'' }}
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
        if (!values.newPassword) {
          errors.newPassword = 'Required';
        } else if (
          !/^[A-Z0-9a-z!@#$%^&*()]{8,}$/i.test(values.newPassword)
        ) {
          errors.newPassword = 'Invalid New Password';
        }
        if (!values.confirmPassword) {
          errors.confirmPassword = 'Required';
        } else if (values.confirmPassword != values.newPassword) {
          errors.confirmPassword = 'Password Mismatch';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        axios.post('https://api.zealnex.com/dev-connect/v1/auth/change-password',{password:values.password,email:values.email,newPassword:values.newPassword,confirmPassword:values.confirmPassword},{headers:{"key": "Cookie", "value": "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNWY4MzBjYi04NzFlLTRjYjAtYjE3Ny00MTgzMTE1MjUwYjQiLCJlbWFpbCI6ImFiY0B4eXouY29tIiwiaWF0IjoxNjg2NDAwNjM5LCJleHAiOjE2ODY0MDc4Mzl9.zYfsMbGIqDoJgKSVcH7cQERXbrmUqGpBhxekf_gmL8E; Max-Age=7200; Domain=api.zealnex.com; Path=/; Expires=Sat, 10 Jun 2023 14:37:19 GMT; HttpOnly; Secure; SameSite=None","type": "default"}}).then((res)=>{
            navTo("/");
          });
        }}>
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" placeholder="Email" name="email" />
          <ErrorMessage name="email" component="div" />
          <br />
          <Field type="text" placeholder="Password" name="password" />
          <ErrorMessage name="password" component="div" />
          <br />
          <Field type="text" placeholder="New Password" name="newPassword" />
          <ErrorMessage name="newPassword" component="div" />
          <br />
          <Field type="text" placeholder="Confirm Password" name="confirmPassword" />
          <ErrorMessage name="confirmPassword" component="div" />
          <br />
          <button className='primary' type="submit">
            Submit
          </button>
          
        </Form>
      )}
    </Formik>
  </div>
  </>)};

export default ChangePasswordPage;