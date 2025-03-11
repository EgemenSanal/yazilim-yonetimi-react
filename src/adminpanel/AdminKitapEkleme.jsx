import { useFormik } from "formik";
import React, { useState } from "react";
import KitapEklemeSchema from "../schemas/Kitapekleme";
import axios from "axios";

function AdminKitapEkleme() {
  const [coverImage, setCoverImage] = useState(null); 
  const [pdfFile, setPdfFile] = useState(null); 

  const { values, handleSubmit, handleChange, handleBlur, setFieldValue } =
    useFormik({
      initialValues: {
        title: "",
        author: "",
        description: "",
        publisher: "",
        year: "",
        file_path: "",
        cover_image: null,
        pages: null, 
        age_limit: "",
      },
      validationSchema: KitapEklemeSchema,
      onSubmit: async (values) => {
        try {
          const token = localStorage.getItem("token");

       
          const formData = new FormData();
          Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
          });

  
          if (coverImage) {
            formData.append("cover_image", coverImage);
          }
          if (pdfFile) {
            formData.append("pages", pdfFile);
          }

          const response = await axios.post("/kitaplerekle", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });

          console.log("Başarılı:", response.data);
        } catch (error) {
          console.error("Hata oluştu:", error.response?.data || error.message);
        }
      },
    });

 
  const handleCoverChange = (event) => {
    const file = event.target.files
    if (file) {
      setCoverImage(file);
      setFieldValue("cover_image", file);
    }
  };


  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setFieldValue("pages", file);
    } else {
      alert("Lütfen bir PDF dosyası yükleyin!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="title"
          value={values.title}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="author"
          value={values.author}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={values.description}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <input
          type="text"
          name="publisher"
          placeholder="yayıncı"
          value={values.publisher}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <input
          type="date"
          name="year"
          placeholder="yıl"
          value={values.year}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
          type="text"
          name="file_path"
          placeholder="file_path"
          value={values.file_path}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <input
          type="text"
          name="age_limit"
          placeholder="yaş sınırı"
          value={values.age_limit}
          onChange={handleChange}
          onBlur={handleBlur}
        />


        <label>Kapak Resmi Yükle:</label>
        <input type="file" name="cover_image" accept="image/*" onChange={handleCoverChange} />

    
        <label>PDF Yükle:</label>
        <input type="file" name="pages" accept="application/pdf" onChange={handlePdfChange} />

        <button type="submit">Ekle</button>
      </form>
    </>
  );
}

export default AdminKitapEkleme;
