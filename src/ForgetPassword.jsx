import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { Forgetpasswordyup } from './schemas/ForgetPasswordyup';
import styles from './assets/Login.module.css'; // CSS dosyasını import ettik

function ForgetPassword() {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordagain: "",
    },
    validationSchema: Forgetpasswordyup, 
    onSubmit: async (values) => {
      try {
        const response = await axios.patch("/passwordrefresh", values);
        console.log(response.data);
      } catch (error) {
        console.log("Hata var", error);
      }
    },
  });

  return (
    <div className={styles.loginbody}>
      <form onSubmit={handleSubmit} className={styles.loginform}>
        <p className={styles.logintitle}>Şifreyi Sıfırla</p>

        <div>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur} 
            placeholder="E-posta"
            autoComplete="email"
            className={styles.login}
          />
          {touched.email && errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur} 
            placeholder="Yeni Şifre"
            autoComplete="new-password"
            className={styles.login}
          />
          {touched.password && errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
        </div>

        <div>
          <input
            type="password"
            name="passwordagain"
            value={values.passwordagain}
            onChange={handleChange}
            onBlur={handleBlur} 
            placeholder="Şifre Tekrar"
            autoComplete="new-password"
            className={styles.login}
          />
          {touched.passwordagain && errors.passwordagain && <div className={styles.errorMessage}>{errors.passwordagain}</div>}
        </div>

        <button type="submit" className={styles.loginbutton}>
          Şifreyi Güncelle
        </button>
      </form>
    </div>
  );
}

export default ForgetPassword;
