import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { AdminLoginyup } from '../schemas/AdminLoginyup'; 
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: AdminLoginyup,
    onSubmit: async (values) => {
      setLoading(true);
      try {
     
        const response = await axios.post("/admin/login", values);

        const { token } = response.data; 
        localStorage.setItem('jwt_token', token); 

        console.log("Admin giriş başarılı!", response.data);

     
        navigate('/admin/dashboard'); 

      } catch (error) {
        console.log("Giriş hatası:", error);
        alert("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
     
        {touched.email && errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
       
        {touched.password && errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Yükleniyor...' : 'Giriş Yap'}
      </button>
    </form>
  );
}

export default AdminLogin;
