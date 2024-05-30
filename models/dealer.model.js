const { DataTypes } = require('sequelize');
const connection = require('../configs/connection');
const UsersModel = require('./user.model');

const DealerModel = connection.define('dealers', {
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
        type: DataTypes.ENUM('distributor', 'dealer'),
        allowNull: false,
        defaultValue: 'dealer' // Default role set to 'dealer'
    },
    userToken: {
        type: DataTypes.TEXT
    },
    adminID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UsersModel,
            key: 'id',
        },
    }
}, {
    timestamps: true
});

DealerModel.belongsTo(UsersModel, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

UsersModel.hasMany(DealerModel, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

module.exports = DealerModel;
