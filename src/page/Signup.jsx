// Render Prop
import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const SignupPage = () => {
  const [code, setCode] = useState(0);
  const emailRef = useRef();
  const navTo = useNavigate();
  const sendCode = () =>{
    console.log(emailRef.current.values.email);
    axios.post('https://api.zealnex.com/dev-connect/v1/auth/resend-register-code',{email:emailRef.current.values.email});
    
  }
return(
  <div className='t-center m-200-0'>
  <h1>Zealnex Technologies</h1>
  <h2>Register</h2>
    <Formik
      initialValues={{ email: '', password: '',confirmPassword: '', code:'' }}
      innerRef={emailRef}
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
          !/^[''A-Z0-9a-z!@#$%^&*()]{8,}$/i.test(values.password)
        ) {
          errors.password = 'Invalid Password';
        }
        if (!values.confirmPassword) {
          errors.confirmPassword = 'Required';
        } else if (values.confirmPassword != values.password) {
          errors.confirmPassword = 'Confirm Password Mismatch';
        }
        if (code != 0 && !values.code) {
          errors.code = 'Required';
        } else if (code != 0 && 
          !/^[0-9]{6,}$/i.test(values.code)
        ) {
          errors.code = 'Invalid code';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        if(code == 0){
          axios.post('https://api.zealnex.com/dev-connect/v1/auth/get-register-code',{email:values.email,password:values.password,confirmPassword:values.confirmPassword}).then((res)=>{
            setCode(1);
          });
        }
        else{
          axios.post('https://api.zealnex.com/dev-connect/v1/auth/register-with-code',{email:values.email,code:values.code}).then((res)=>{
            navTo("/login");
          });
        }
        
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" placeholder="Email" name="email" />
          <ErrorMessage name="email" component="div" />
          <br />
          {code == 0  ? (<>
            <Field type="text" placeholder="Password" name="password" />
            <ErrorMessage name="password" component="div" />
            <br/>
            <Field type="text" placeholder="Confirm Password" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" />
          </>):(<>
            <Field type="text" placeholder="Code" name="code" />
            <ErrorMessage name="code" component="div" />
          </>)}

          
          <br />
          {code == 0 ? <a onClick={() => navTo("/forget_password")} className='bluee f-left'>Forget Password?</a>:<a onClick={sendCode} className='bluee f-left'>Resend Code?</a> }
          
          <br />
          <button className='primary' type="submit">
          {code == 0 ? 'Get Code' : 'Submit'}
          </button>
          <p>Already Registered <a className='bluee' onClick={() => navTo('/login')}>Login?</a></p> 
          
        </Form>
      )}
    </Formik>
  </div>
  )
  
};

export default SignupPage;