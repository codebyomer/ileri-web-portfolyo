const { Sequelize } = require('sequelize');

// SQLite veritabanı bağlantısı oluşturuluyor.
// Veritabanı dosyası proje dizininde 'database.sqlite' olarak kaydedilecek.
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Veritabanı dosyasının konumu
    logging: false // Konsolda SQL sorgularının görünmesini (kalabalık yapmasını) kapatmak için
});

module.exports = sequelize;
