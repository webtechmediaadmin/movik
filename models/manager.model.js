const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");
const AdminModel = require("./admin.model");

const ManagerModel = connection.define('managers', {
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
        type: DataTypes.ENUM("dealer", "distributor"),
        defaultValue: 'dealer'
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    adminID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AdminModel,
            key: 'id',
        },
    }
});


ManagerModel.belongsTo(AdminModel, {
    foreignKey: 'adminID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

AdminModel.hasMany(ManagerModel, {
    foreignKey: 'adminID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


module.exports = ManagerModel;