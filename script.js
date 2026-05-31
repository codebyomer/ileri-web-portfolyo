// ES6 Standartları: const ve let kullanımı ile değişken tanımlama
const themeBtn = document.getElementById('themeToggleBtn');
const contactForm = document.getElementById('contactForm');

// 1. LocalStorage Entegrasyonu (Kalıcı Tema)
// Sayfa yüklendiğinde localStorage'da önceden kaydedilmiş bir tema ayarı var mı kontrol ediyoruz.
const savedTheme = localStorage.getItem('theme');

// Eğer kaydedilmiş tema 'dark' ise sayfaya dark-theme sınıfını ekliyoruz.
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// ES6 Arrow Function Kullanımı (Geleneksel 'function()' yerine ok fonksiyonu kullanıldı)
themeBtn.addEventListener('click', () => {
    // Sınıfı aç/kapat (toggle)
    document.body.classList.toggle('dark-theme');
    
    // Mevcut temanın durumunu kontrol et
    const isDarkMode = document.body.classList.contains('dark-theme');
    
    // Duruma göre localStorage'a 'dark' veya 'light' olarak kaydet
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// 2. Form Yönetimi, PreventDefault ve Backend'e Veri Gönderme (Fetch API)
contactForm.addEventListener('submit', async (e) => {
    // Formun varsayılan davranışı olan sayfa yenileme işlemini engelliyoruz
    e.preventDefault();
    
    // Formdaki girdilerin değerlerini alıyoruz
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        // Backend API'sine POST isteği gönderiyoruz
        const response = await fetch('http://localhost:3000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Veriyi JSON formatına çevirerek gövdeye (body) ekliyoruz
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();

        if (response.ok) {
            // Sunucudan başarılı yanıt gelirse
            alert('Mesajınız başarıyla alındı ve veritabanına kaydedildi!');
            // Gönderim başarılı olduktan sonra form içindeki alanları temizliyoruz
            contactForm.reset();
        } else {
            // Sunucudan hata gelirse
            alert('Hata: ' + result.message);
        }
    } catch (error) {
        // Ağ hatası veya sunucuya ulaşılamama durumu
        console.error('İstek gönderilirken hata:', error);
        alert('Sunucuya bağlanılamadı. Lütfen backend sunucusunun (server.js) çalıştığından emin olun.');
    }
});
