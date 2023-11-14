const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const tokenExtractor = (req,res,next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        try{
            req.decodedToken = jwt.verify(authorization.substring(7),SECRET)
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
