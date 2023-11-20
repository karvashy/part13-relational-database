const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

const User = require('./user')

class Session extends Model{}

Session.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
}, {
    sequelize,
    underscored: true
})

module.exports = Session
