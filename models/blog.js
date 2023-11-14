const { sequelize } = require('../utils/db')
const { Model, DataTypes } = require('sequelize')

class Blog extends Model {}

Blog.init({
    id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    title: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    author: {
            type: DataTypes.TEXT,
        },
    url: {
            type: DataTypes.TEXT,
            allowNull: false,
            nonEmpty: true,
            validate: {
                notEmpty: true
            }
        },
    likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            min: 1991,
            max: (new Date()).getFullYear()
        }
    }
},{
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog'

})

module.exports = Blog
