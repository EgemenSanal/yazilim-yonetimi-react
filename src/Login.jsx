import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Loginyupp } from './schemas/Loginyupp';
import { useNavigate } from 'react-router-dom';
import styles from './assets/Login.module.css'; // CSS dosyasını import ettik

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, []);

  const formik = useFormik({
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
        console.log("Giriş başarılı:", role);

        navigate(role === "a" ? "/Adminlogin" : "/Anasayfa");
      } catch (error) {
        console.error("Hata var", error);
        if (error.response?.status === 404) {
          alert("Hesap bulunamadı! Kayıt olmanız gerek.");
          navigate("/register");
        }
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className={styles.loginbody}>
      <form onSubmit={formik.handleSubmit} className={styles.loginform}>
        <p className={styles.logintitle}>Login</p>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="username"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.login}
          />
          {formik.touched.email && formik.errors.email && (
            <div className={styles.errorMessage}>{formik.errors.email}</div>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.login}
          />
          {formik.touched.password && formik.errors.password && (
            <div className={styles.errorMessage}>{formik.errors.password}</div>
          )}
        </div>

        <button type="submit" disabled={loading} className={styles.loginbutton}>
          {loading ? 'Yükleniyor...' : 'Giriş Yap'}
        </button>
      </form>
    </div>
  );
}

export default Login;
