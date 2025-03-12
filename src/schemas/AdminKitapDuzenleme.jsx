import  * as  yup from "yup"

 export const kitapduzenle=yup.object({
  title: yup
    .string()
    .min(3, "Başlık en az 3 karakter olmalıdır"),
  
  author: yup
    .string()
    .min(3, "Yazar adı en az 3 karakter olmalıdır"),

  description: yup
    .string()
    .min(10, "Açıklama en az 10 karakter olmalıdır"),

  publisher: yup
    .string()
    .min(2, "Yayıncı adı en az 2 karakter olmalıdır"),

  year: yup
    .date()
    .max(new Date(), "Gelecek bir yıl olamaz"),

  pages: yup
    .number()
    .positive("Sayfa sayısı negatif olamaz")
    .integer("Sayfa sayısı tam sayı olmalıdır")
    .min(1, "En az 1 sayfa içermelidir"),

  file_path: yup
    .string()
    .url("Geçerli bir dosya URL'si giriniz"),

  cover_image: yup
    .string()
    .url("Geçerli bir kapak resmi URL'si giriniz"),


  age_limit: yup
    .number()
    .integer("Yaş sınırı tam sayı olmalıdır")
    .min(0, "Yaş sınırı negatif olamaz"),
  
})