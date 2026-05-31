const express = require('express');
const cors = require('cors'); // Frontend'den gelecek isteklerde CORS hatasını önlemek için
const sequelize = require('./config/database');
const Message = require('./models/Message');

const app = express();
const PORT = 3000;

// Gelen isteklerin gövdesindeki (body) JSON verilerini ayrıştırmak (parse) için middleware
app.use(express.json());
// Frontend farklı portta (veya doğrudan dosya sisteminde) çalışıyorsa iletişim kurabilmesi için CORS kullanıyoruz
app.use(cors());

// Veritabanı bağlantısını test etme ve tabloları oluşturma
sequelize.sync().then(() => {
    console.log('Veritabanı bağlantısı başarılı ve tablolar senkronize edildi.');
}).catch((error) => {
    console.error('Veritabanı bağlantı hatası:', error);
});

// İletişim formundan gelen verileri karşılayacak POST route'u (MVC Mimarisi - Controller mantığı)
app.post('/api/messages', async (req, res) => {
    try {
        // Frontend'den gelen JSON verilerini alıyoruz
        const { name, email, message } = req.body;

        // Veritabanına yeni bir mesaj kaydediyoruz
        const newMessage = await Message.create({
            name,
            email,
            message
        });

        // Başarılı olursa istemciye 201 (Oluşturuldu) statüsü ile cevap dönüyoruz
        res.status(201).json({
            success: true,
            message: 'Mesajınız başarıyla kaydedildi!',
            data: newMessage
        });
    } catch (error) {
        // Hata durumunda 500 (Sunucu Hatası) dönüyoruz
        console.error('Mesaj kaydedilirken hata:', error);
        res.status(500).json({
            success: false,
            message: 'Mesaj kaydedilirken bir hata oluştu.'
        });
    }
});

// Sunucuyu belirtilen portta başlatma
app.listen(PORT, () => {
    console.log(`Backend sunucusu çalışıyor: http://localhost:${PORT}`);
});
