const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async(req,res, next)=> {
    try {
        if(!req.header('Authorization')){
            return res.status(401).send('Unauthorized request')
        }
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch(e){
        console.log(e)
        res.status(401).send(e)
    }
}


module.exports = auth