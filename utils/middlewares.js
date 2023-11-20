const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const Session = require('../models/session')

const tokenExtractor = async (req,res,next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        const token = authorization.substring(7)
        console.log('token in tokenExtractor',token)
        try{
            const session = await Session.findOne({where:{token: token}})
            if(!session){
                return res.status(401).json({'message':'Session expired'})
            } 
        }
        catch(error){
            console.log('session error in token extractor', error)
        }
        try{
            req.decodedToken = jwt.verify(token,SECRET)
        }
        catch(error){
            return res.status(401).json({error: 'token invalid'})
        }
    }
    else{
        return res.status(401).json({error: 'not logged in'})
    }
    next()
}
const errorHandler = (error, request, response, next) => {
    if(error.name === "SequelizeValidationError" && error.errors[0].type === "Validation error"){
        if(error.errors[0].validatorName === "isEmail"){
            return response.status(400).json({error: [
                    "Validation isEmail on username failed"
                ]
            })
        }
        if(error.errors[0].path === "year"){
            return response.status(400).json({error: `year should be between 1990 to ${(new Date()).getFullYear()}`})
        }
    }
    return response.status(400).json({error})
}

module.exports = { tokenExtractor, errorHandler }
