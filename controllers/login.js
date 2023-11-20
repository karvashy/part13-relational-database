const jwt = require('jsonwebtoken')
const router = require('express').Router()
const User = require('../models/user')
const Session = require('../models/session')
const { SECRET } = require('../utils/config')

router.post('/',async (req,res) => {
    if(req.body.password !== SECRET){
        return res.status(401).json({message: 'Invalid username or password'})
    }
    const user = await User.findOne({where: {
        username: req.body.username
    }})
    if(!user){
        return res.status(401).json({message: 'Invalid username or password'})
    }
    console.log('user in loginRouter',user)
    const msgForToken = {
        username : req.body.username,
        id: user.id
    }
    const token = jwt.sign(msgForToken,SECRET)
    await Session.create({token,userId: user.id}) 
    res.status(200).json({token, username: user.username, name: user.name})
})
module.exports = router
