const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// 'Message' (Mesaj) modeli tanımlanıyor. 
// Bu model, veritabanındaki 'Messages' tablosuna denk gelir.
const Message = sequelize.define('Message', {
    // İsim alanı
    name: {
        type: DataTypes.STRING,
        allowNull: false // Boş geçilemez
    },
    // E-posta alanı
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true // Geçerli bir e-posta formatı olup olmadığını kontrol eder
        }
    },
    // Mesaj alanı
    message: {
        type: DataTypes.TEXT, // Uzun metinler için TEXT tipi
        allowNull: false
    }
});

module.exports = Message;
