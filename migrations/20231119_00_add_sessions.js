const { DataTypes, QueryInterface } = require('sequelize')

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.createTable('sessions', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            created_at: {
                type: DataTypes.DATE(),
                allowNull: false
            },
            updated_at: {
                type: DataTypes.DATE(),
                allowNull: false
            }
        })
        await queryInterface.addColumn('users','disabled',{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        })
    },
    down: async({context: queryInterface}) => {
        await queryInterface.dropTable('sessions')
        await queryInterface.dropTable('users')
    }
}
