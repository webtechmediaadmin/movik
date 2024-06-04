const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");
const ManagerModel = require("./manager.model");
const ProductModel = require("./product.model");

const SalesModel = connection.define('sales', {
    managerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ManagerModel,
            key: 'id',
        }
    },
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProductModel,
            key: 'id',
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.DATEONLY
    }
});

SalesModel.belongsTo(ManagerModel, {
    foreignKey: 'managerID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

ManagerModel.hasMany(SalesModel, {
    foreignKey: 'managerID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

SalesModel.belongsTo(ProductModel, {
    foreignKey: 'productID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

ProductModel.hasMany(SalesModel, {
    foreignKey: 'productID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = SalesModel;
