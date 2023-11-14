const { DataTypes } = require('sequelize')

const rangeOfNumbers = (start,end) => {
    const rangeArray = []
    for(let i = start; i <= end; i++){
        rangeArray.push(i)
    }
    return rangeArray
}
module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.addColumn('blogs','year',{
            type: DataTypes.INTEGER,
        })
    },
    down: async ({context: queryInterface}) => {
        await queryInterface.dropTable('blogs')
        await queryInterface.dropTable('users')
    }
}
