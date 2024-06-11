const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");

const AdminModel = connection.define('admins', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM("super-admin", "admin"),
        defaultValue: 'admin'
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    }
})


module.exports = AdminModel;