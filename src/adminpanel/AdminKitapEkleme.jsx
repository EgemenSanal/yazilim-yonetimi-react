import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

export default function AdminKitapEkleme() {
  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      description: "",
      publisher: "",
      year: "",
      age_limit: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = localStorage.getItem("jwt_token");

        
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("author", values.author);
        formData.append("description", values.description);
        formData.append("publisher", values.publisher);
        formData.append("year", values.year);
        formData.append("age_limit", values.age_limit);

        if (coverImage) {
          formData.append("cover_image", coverImage);
        }

        if (pdfFile) {
          formData.append("pdf_file", pdfFile);
        }

        const response = await axios.post("http://localhost:8000/api/books", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Başarılı:", response.data);
        alert("Kitap başarıyla eklendi!");

        resetForm();
        setCoverImage(null);
        setPdfFile(null);
      } catch (error) {
        console.error("Hata oluştu:", error.response?.data || error.message);
        alert("Kitap eklenirken bir hata oluştu.");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="title"
        placeholder="Kitap Başlığı"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <input
        type="text"
        name="author"
        placeholder="Yazar"
        value={formik.values.author}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <textarea
        name="description"
        placeholder="Açıklama"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <input
        type="text"
        name="publisher"
        placeholder="Yayıncı"
        value={formik.values.publisher}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <input
        type="number"
        name="year"
        placeholder="Yayın Yılı"
        value={formik.values.year}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <input
        type="text"
        name="age_limit"
        placeholder="Yaş Sınırı"
        value={formik.values.age_limit}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <label>Kapak Resmi:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCoverImage(e.target.files[0])}
      />

      <label>PDF Dosyası:</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdfFile(e.target.files[0])}
      />

      <button type="submit">Kitap Ekle</button>
    </form>
  );
}