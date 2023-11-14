const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../models/blog')

router.get('/',async (req,res) => {
    const blogs = await Blog.findAll({
        group: 'author',
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
            [sequelize.fn('COUNT', sequelize.col('likes')), 'likes']
        ],
        order: [['likes','DESC']]
    })
    return res.status(200).json(blogs)
})

module.exports = router
