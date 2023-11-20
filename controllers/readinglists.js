const router = require('express').Router()
const { ReadingList } = require('../models')
const { tokenExtractor } = require('../utils/middlewares')

//TODO: Remove this. This is for debugging
router.get('/',async (req,res) => {
    const list = await ReadingList.findAll({})
    return res.status(200).json({"readingList":list})
})

// Note: Didn't add authentication middleware since 
// it is not a requirement in the exercise wordings
router.post('/', async (req,res) => {
    if(req.body.blogId && req.body.userId){
        const status = await ReadingList.create({...req.body,status:false})
        return res.status(200).json(status)
    }
    else{
        console.log(blogId,req.body.blogId,'userId',req.body.userId)
        return res.status(400).json({message: 'Setting reading status requires blogId and userId'})
    }
})

router.put('/:id', tokenExtractor, async (req,res) => {
    if(!req.decodedToken){
        return res.status(401).json({'message':'Not logged in'})
    }
    const readStatus = await ReadingList.findOne({where: {
        blogId: req.params.id
    }})
    if(req.body.read){
        if(readStatus.userId === req.decodedToken.id){
            readStatus.status = req.body.read
            readStatus.save()
        }
        else{
            return res.status(403).json({'error':'Read status can be changed only for the blogs on your reading list'})
        }
    }
    else{
        return res.status(400).json({'error':'Read status object is required in the body'})
    }

    console.log('readStatus',readStatus)
    return res.status(200).json({'message':'Read status changed successfully'})
})

module.exports = router
