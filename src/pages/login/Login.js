// pages/Login.js

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, resetError } from '../../features/myLogin/loginSlice';
import * as Yup from 'yup';
import style from './Login.module.scss';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import login_img from '../../assets/login_img.png';
import { GoogleIcon, FacebookIcon, LinkedInIcon, TwitterIcon } from "../../assets/Assets";

// password checking
const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    
    try {
      await validationSchema.validate({ email, password }, { abortEarly: false });
      
     
      try {
        const result = await dispatch(loginUser({ email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
          navigate('/home/countryList');
        }
      } catch (err) {
        window.alert(`Submission error: ${err.message}`);
        dispatch(resetError());
      }
    } catch (err) {
      const validationErrors = err.inner.map(error => error.message).join('\n');
      window.alert(`Validation errors:\n${validationErrors}`);
      dispatch(resetError()); 
    }
  }, [dispatch, navigate]);

  
  useEffect(() => {
    if (error) {
      window.alert(`Error: ${error}`);
      dispatch(resetError()); 
    }
  }, [error, dispatch]);

  return (
    <Container fluid className={style.container}>
      <Row className={style.row}>
        <Col xs={12} md={12} lg={3} className={style.column1}>
          <div className={style.loginForm}>
            <div className={style.signInTxt}>Sign In</div>
            <div className={style.newUserWrapper}>
              <span className={style.newUserTxt}>New user?</span>
              <span className={style.createAcctTxt}>Create an account</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Username or email"
                  className={style.inputFields}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={style.inputFields}
                />
              </div>
              <div className={style.formGroup}>
                <input
                  type="checkbox"
                  name="keepSignedIn"
                />
                <label className={style.checkBox}>Keep me signed in</label>
              </div>
              <Button type="submit" className={style.signInBtn} disabled={status === 'loading'}>
                Sign In
              </Button>
              <div className={style.dividerWrapper}>
                <div className={style.divider} />
                <span className={style.signInWithTxt}>Or Sign In With</span>
                <div className={style.divider} />
              </div>
              <div className={style.iconsWrapper}>
                <GoogleIcon />
                <FacebookIcon />
                <LinkedInIcon />
                <TwitterIcon />
              </div>
            </form>
          </div>
        </Col>
        <Col xs={0} md={9} lg={9} className={style.column2}>
          <Image className={style.loginImg} src={login_img} />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
