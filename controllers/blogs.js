const router = require('express').Router()
const { tokenExtractor } = require('../utils/middlewares')

const { Blog, User } = require('../models')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
    let where = {}
    if(req.query.search){
        where = {
            [Op.or] : {
                title : {
                    [Op.substring]: req.query.search,
                },
                author: {
                    [Op.substring]: req.query.search
                }
            }
        }
    }
        const blogs = await Blog.findAll({
            include: {
                model: User 
            },
            where,
            order: [
                ['likes','DESC']
            ]
        })
        res.json(blogs)
    })

router.post('/', tokenExtractor,async (req, res) => {
    if(req.decodedToken){
        const blog = await Blog.create({...req.body, userId: req.decodedToken.id})
        return res.json(blog)
    }
    else{
        return res.status(401).json({message: 'Not logged in'})
    }
})

router.delete('/:id',tokenExtractor,async (req,res) => {
    try{
        const blog = await Blog.findByPk(req.params.id, {include:{model: User}})
        if(blog && req.decodedToken && blog.user && req.decodedToken.username === blog.user.username){
            await blog.destroy()
            res.status(200).json({"message":"Deleted successfully"})
        }
        else if(!req.decodedToken){
            return res.status(401).json({message: 'not logged in'})
        }
        else if(!blog){
            return res.status(404).json({message: 'blog not found'})
        }
        else{
            return res.status(403).json({message: 'blog can be deleted only by its creator'})
        }
    }
    catch(error){
        res.status(400).json({error})
    }
})
router.put('/:id', async (req,res) => {
        const blog = await Blog.findByPk(req.params.id)
        if(blog){
            blog.likes = blog.likes + 1
            blog.save()
            res.status(200).json({"likes":blog.likes})
        }
        else{
            res.status(404).end()
        }

})

module.exports = router
