import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Loginyupp } from './schemas/Loginyupp';
import { useNavigate } from 'react-router-dom';
import './assets/login.css';

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Loginyupp,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post("api/login", values);
        
        const { token, role } = response.data;
        localStorage.setItem('jwt_token', token);

        if (role === "a") {
          navigate("/Adminlogin");
        } else {
          navigate("/Anasayfa");
        }
      } catch (error) {
        console.log("Hata var", error);

        if (error.response && error.response.status === 404) {
          alert("Hesap bulunamadı! Kayıt olmanız gerek.");
          navigate("/register");
        }
      } finally {
        setLoading(false);
      }
    }
  });

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token};`
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="loginform">
        <p className="logintitle">Login</p>
        <div>
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={values.email}
    onChange={handleChange}
    onBlur={handleBlur}
    className="login"
  />
  {touched.email && errors.email && <div className="error-message">{errors.email}</div>}
</div>

<div>
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={values.password}
    onChange={handleChange}
    onBlur={handleBlur}
    className="login"
  />
  {touched.password && errors.password && <div className="error-message">{errors.password}</div>}
</div>

        <button type="submit" disabled={loading} className='loginbutton'>
          {loading ? 'Yükleniyor...' : 'Giriş Yap'}
        </button>
      </form>
    </>
  );
}

export default Login;