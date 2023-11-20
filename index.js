const express = require('express')
require('express-async-errors')
const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const readingListRouter = require('./controllers/readinglists')
const logoutRouter = require('./controllers/logout')
const { Blog }  = require('./models')
const { errorHandler } = require('./utils/middlewares')

const app = express()
app.use(express.json())
app.use('/api/blogs',blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)
app.use('/api/authors',authorsRouter)
app.use('/api/readinglists',readingListRouter)
app.use('/api/logout',logoutRouter)

app.use(errorHandler)

const initialise = async () => {
    await Blog.create({
        title: 'On let vs const',
        author: 'Dan Abramov',
        url: 'google.com' 
    })
    await Blog.create({
        title: 'Gaps in sequences in PostgreSQL',
        author: 'Laurenz Albe',
        url: 'google.com' 
    })
}
(async () => await initialise())
const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}
start()
/*
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
*/
