const router = require('express').Router()
const User = require('../models/user')
const Session = require('../models/session')
const { tokenExtractor } = require('../utils/middlewares')

router.delete('/',tokenExtractor,async (req,res) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        const token = authorization.substring(7)
        const session = await Session.findOne({where: {token}})
        await session.destroy()
        if(!session){
            return res.status(403).json({'message':'Token expired'})
        }
        return res.status(200).json({'message':'Session deleted successfully'})
    }
    else{
        return res.status(401).json({'message':'Not logged in'})
    }
})

module.exports = router
