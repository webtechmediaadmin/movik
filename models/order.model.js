const connection = require("../configs/connection");
const ManagerModel = require("./manager.model");
const ProductModel = require("./product.model");
const { DataTypes } = require("sequelize");

const OrderModel = connection.define('orders', {
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
    date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("pending", "in-transit", "delivered", "cancelled"),
        defaultValue: "pending",
    }
});

OrderModel.belongsTo(ManagerModel,{
    foreignKey: 'managerID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

ManagerModel.hasMany(OrderModel,{
    foreignKey: 'managerID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

OrderModel.belongsTo(ProductModel,{
    foreignKey: 'productID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

ProductModel.hasMany(OrderModel,{
    foreignKey: 'productID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

module.exports = OrderModel;