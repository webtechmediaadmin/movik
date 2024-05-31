const { DataTypes } = require('sequelize');
const connection = require('../configs/connection');
const DealerModel = require('./dealer.model');

const OrderModel = connection.define('orders', {
    dealerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: DealerModel,
            key: 'id',
        },
    },
    productName: {

    },
    quantity: {

    },
}, {
    timestamps: true
});

OrderModel.belongsTo(DealerModel, {
    foreignKey: 'dealerID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

DealerModel.hasMany(OrderModel, {
    foreignKey: 'dealerID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

module.exports = OrderModel;
