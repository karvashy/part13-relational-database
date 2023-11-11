require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async()  => {
    try{
        await sequelize.authenticate()
        const blogs = await sequelize.query("select * from blogs", {type: QueryTypes.SELECT})
        for(let i = 0; i < blogs.length; i++){
            let blog = blogs[i]
            console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
        }
        sequelize.close()

    }
    catch (error) {
        console.log('Unable to connect to the database: ', error)
    }
}

main()
