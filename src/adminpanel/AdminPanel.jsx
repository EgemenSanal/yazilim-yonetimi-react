import React from 'react';
import { useNavigate } from 'react-router-dom';
import indirImage from '../image/indir.jpg';
import '../assets/adminpanel.css';
import adminImage from '../image/görsel2.jpg';
import adminImage2 from '../image/görsel3.jpg';

function AdminPanel() {
    const navigate = useNavigate();

    const gitKitapEkle = () => {
        navigate("/adminpanel/kitap-ekle");
    };

    const gitResimYukle = () => {
        navigate("/adminpanel/resim-yukle");
    };

    const kitapKisitlama = () => {
        navigate("/adminpanel/kitap-duzenle");
    };

    const kitaplariGoruntule = () => {
        navigate("/adminpanel/kitap-goruntule");
    };

    return (
        <>
            <h1>Admin Panel</h1>
            <div className="image-container" onClick={gitKitapEkle}>
                <img src={indirImage} className="admin-image" alt="Kitap Ekle" />
                <div className="hover-text">Kitap Ekle</div>
            </div>
            <div className="image-container" onClick={gitResimYukle}>
                <img src={adminImage} className="admin-image" alt="Resim Yükle" />
                <div className="hover-text">Resim Yükle</div>
            </div>
            <div className="image-container" onClick={kitapKisitlama}>
                <img src={adminImage2} className="admin-image" alt="Age Kısıtla" />
                <div className="hover-text">Kitap Düzenle</div>
            </div>
            <div className="image-container" onClick={kitaplariGoruntule}>
                <img src={adminImage2} className="admin-image" alt="Kitaplarımı Görüntüle" />
                <div className="hover-text">Kitaplarımı Görüntüle</div>
            </div>
        </>
    );
}

export default AdminPanel;
