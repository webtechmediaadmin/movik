const connection = require("../configs/connection");
const ManagerModel = require("./users.model");

const OrderModel = connection.define('sales', {
    managerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ManagerModel,
            key: 'id',
        }
    },
    
});


module.exports = OrderModel;