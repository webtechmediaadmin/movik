const { DataTypes } = require('sequelize');
const connection = require('../configs/connection');

const UsersModel = connection.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumberOTP: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    isNumberVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Others'),
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM('super-admin', 'admin', 'distributor','dealer'),
        allowNull: false,
        defaultValue: 'dealer' // Default role set to 'dealer'
    },
    userToken: {
        type: DataTypes.TEXT
    },
}, {
    timestamps: true
});

module.exports = UsersModel;
