// Render Prop
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgetPasswordPage = () => {
  const [code, setCode] = useState(0);
  const navTo = useNavigate();
  return(
  <div className='t-center m-200-0'>
  <h1>Zealnex Technologies</h1>
  <h2>Forget Password</h2>
    <Formik
      initialValues={{ email: '', newPassword: '',confirmPassword: '', code:'' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if(code == 1){
          if (!values.newPassword) {
            errors.newPassword = 'Required';
          } else if (
            !/^[A-Z0-9a-z!@#$%^&*()]{8,}$/i.test(values.newPassword)
          ) {
            errors.newPassword = 'Invalid Password';
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
          } else if (values.confirmPassword != values.newPassword) {
            errors.confirmPassword = 'Confirm Password Mismatch';
          }
          if (!values.code) {
            errors.code = 'Required';
          } else if (
            !/^[0-9]{6,}$/i.test(values.code)
          ) {
            errors.code = 'Invalid code';
          }
        }
        
        
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        if(code == 1){
          axios.post('https://api.zealnex.com/dev-connect/v1/auth/change-password-with-code',{code:values.code,email:values.email,newPassword:values.newPassword,confirmPassword:values.confirmPassword}).then((res)=>{
            navTo("/login");
          });
        }
        else{
          axios.post('https://api.zealnex.com/dev-connect/v1/auth/get-forgot-password-code',{email:values.email}).then((res)=>{
            setCode(1);
          });
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" placeholder="Email" name="email" />
          <ErrorMessage name="email" component="div" />
          <br />
          { code == 1 && (
            <>
            <Field type="text" placeholder="Code" name="code" />
            <ErrorMessage name="code" component="div" />
            <br/>
            <Field type="text" placeholder="New Password" name="newPassword" />
            <ErrorMessage name="newPassword" component="div" />
            <br />
            <Field type="text" placeholder="Confirm Password" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" />
            </>
          )}
          
          
          <br />
          <button className='primary' type="submit">
          {code == 0 ? 'Get Code' : 'Submit'}
          </button>
          
        </Form>
      )}
    </Formik>
  </div>
)};

export default ForgetPasswordPage;