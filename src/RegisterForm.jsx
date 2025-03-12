import { Link } from 'react-router-dom';
import React from "react";
import { useFormik } from "formik";
import { RegisterSchema } from "./schemas/Registeryup";
import axios from "axios";
import styles from "./assets/Register.module.css"; // Güncellenmiş CSS dosyası

function RegisterForm() {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      age: "",
      password: "",
      passwordagain: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/register", values);
        console.log(response.data);
      } catch (error) {
        console.error("Kayıt işlemi başarısız oldu:", error);
      }
    },
  });

  return (
    <div className={styles.loginbody}>
      <form onSubmit={handleSubmit} className={styles.loginform}>
        <p className={styles.logintitle}>Kayıt Ol</p>

        <div>
          <input
            type="email"
            name="email"
            placeholder="E-posta adresiniz"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            className={styles.login}
          />
          {touched.email && errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Şifreniz"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="new-password"
            className={styles.login}
          />
          {touched.password && errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
        </div>

        <div>
          <input
            type="password"
            name="passwordagain"
            placeholder="Şifreyi Tekrar Girin"
            value={values.passwordagain}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="new-password"
            className={styles.login}
          />
          {touched.passwordagain && errors.passwordagain && <div className={styles.errorMessage}>{errors.passwordagain}</div>}
        </div>

        <div>
          <input
            type="number"
            name="age"
            placeholder="Yaşınızı Girin"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.login}
          />
          {touched.age && errors.age && <div className={styles.errorMessage}>{errors.age}</div>}
        </div>

        <button type="submit" className={styles.loginbutton}>Kayıt Ol</button>

        <p className={styles.loginfooter}>
          Zaten hesabınız var mı? <Link to="/login" className={styles.loginlink}>Giriş Yap</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
