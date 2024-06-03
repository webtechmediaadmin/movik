const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");

const ProductModel = connection.define('products', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true
    },
    inventoryCount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

module.exports = ProductModel;