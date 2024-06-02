const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");

const SuperAdminModel = connection.define('superAdmins', {
    email: {
        type : DataTypes.STRING,
        allowNull : true,
    },
    password: {
        type : DataTypes.STRING,
        allowNull : true,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'super-admin'
    }
})


module.exports = SuperAdminModel;