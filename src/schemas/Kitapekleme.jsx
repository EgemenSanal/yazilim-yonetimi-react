import * as yup from "yup";

const KitapEklemeSchema = yup.object({
  title: yup
    .string()
    .required("Başlık zorunludur")
    .min(3, "Başlık en az 3 karakter olmalıdır"),
  
  author: yup
    .string()
    .required("Yazar adı zorunludur")
    .min(3, "Yazar adı en az 3 karakter olmalıdır"),

  description: yup
    .string()
    .required("Açıklama zorunludur")
    .min(10, "Açıklama en az 10 karakter olmalıdır"),

  publisher: yup
    .string()
    .required("Yayıncı adı zorunludur")
    .min(2, "Yayıncı adı en az 2 karakter olmalıdır"),

  year: yup
    .date()
    .required("Yıl zorunludur")
    .max(new Date(), "Gelecek bir yıl olamaz"),

  pages: yup
    .number()
    .required("Sayfa sayısı zorunludur")
    .positive("Sayfa sayısı negatif olamaz")
    .integer("Sayfa sayısı tam sayı olmalıdır")
    .min(1, "En az 1 sayfa içermelidir"),

  file_path: yup
    .string()
    .url("Geçerli bir dosya URL'si giriniz")
    .required("Dosya yolu zorunludur"),

  cover_image: yup
    .string()
    .url("Geçerli bir kapak resmi URL'si giriniz")
    .required("Kapak resmi zorunludur"),

  age_limit: yup
    .number()
    .required("Yaş sınırı zorunludur")
    .integer("Yaş sınırı tam sayı olmalıdır")
    .min(0, "Yaş sınırı negatif olamaz")
    .boolean("+18 yaş için mi "),
});

export default KitapEklemeSchema;
