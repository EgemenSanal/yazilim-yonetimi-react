import React, { useState } from 'react';
import { kitapduzenle } from '../schemas/AdminKitapDuzenleme';
import { useFormik } from 'formik';
import axios from 'axios';

function AdminKitapDuzenleme() {
  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const { values, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik({
    initialValues: {
      title: '',
      author: '',
      description: '',
      publisher: '',
      year: new Date().toISOString().split('T')[0], // YYYY-MM-DD formatı
      file_path: '',
      age_limit: '',
    },
    validationSchema: kitapduzenle,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');

        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });

        if (coverImage) {
          formData.append('cover_image', coverImage);
        }
        if (pdfFile) {
          formData.append('pages', pdfFile);
        }

        const response = await axios.patch('/kitaplerekle', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        alert('Kitap başarıyla güncellendi!');
        console.log('Başarılı:', response.data);
      } catch (error) {
        alert('Hata oluştu: ' + (error.response?.data?.message || 'Bilinmeyen bir hata'));
        console.error('Hata oluştu:', error.response?.data || error.message);
      }
    },
  });

  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Lütfen bir PDF dosyası yükleyin!');
        return;
      }
      setPdfFile(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="title"
        placeholder="Kitap Başlığı"
        value={values.title}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Yazar"
        value={values.author}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Açıklama"
        value={values.description}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <input
        type="text"
        name="publisher"
        placeholder="Yayıncı"
        value={values.publisher}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <input
        type="date"
        name="year"
        value={values.year}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <input
        type="text"
        name="file_path"
        placeholder="Dosya Yolu"
        value={values.file_path}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <input
        type="text"
        name="age_limit"
        placeholder="Yaş Sınırı"
        value={values.age_limit}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <label>Kapak Resmi Yükle:</label>
      <input type="file" name="cover_image" accept="image/*" onChange={handleCoverChange} />

      <label>PDF Yükle:</label>
      <input type="file" name="pages" accept="application/pdf" onChange={handlePdfChange} />

      <button type="submit">Değiştir</button>
    </form>
  );
}

export default AdminKitapDuzenleme;
