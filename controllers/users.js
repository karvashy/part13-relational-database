const router = require('express').Router()
const { tokenExtractor } = require('../utils/middlewares')

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll({include: {model: Blog}})
    res.json(users)
})

router.post('/', async (req, res,next) => {
    try{
        const user = await User.create(req.body)
        return res.status(200).json(user)
    }
    catch(error){
        next(error)
    }
})

router.put('/:username', tokenExtractor, async (req,res) => {
    if(!req.decodedToken){
        return res.status(401).json({message: 'not logged in'})
    }
    if(req.decodedToken.username !== req.params.username){
        return res.status(403).json({message: 'Unauthorized action'})
    }
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })
    if(user){
        user.username = req.body.username
        console.log('saving username',user.username)
        await user.save()
        return res.status(201).json({message: 'username successfully changed'})
    }
    else{
        return res.status(401).json({message: 'Wrong username or password'})
    }
})

module.exports = router
