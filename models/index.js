const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through: ReadingList, as: 'readings'})
Blog.belongsToMany(User, {through: ReadingList, as: 'added_by_users'})
User.hasMany(ReadingList)
ReadingList.belongsTo(User)
Blog.hasMany(ReadingList)
ReadingList.belongsTo(Blog)

Session.belongsTo(User)
User.hasOne(Session)

/*
Blog.sync({alter: true})
User.sync({alter: true})
*/

module.exports = {
    Blog,
    User,
    ReadingList,
    Session
}
