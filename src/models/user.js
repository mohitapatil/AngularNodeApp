const mongoose = require('mongoose')
const validateor = require('validator')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { createSecureContext } = require('tls')

const userSchema = new mongoose.Schema({
    Firstname:{
        type: String,
        required: true,
        trim: true
    },
    Lastname:{
        type: String,
        required: true,
        trim: true
    },
    State:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validateor.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    }, 
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot be "password"')
            }
        }
    },
    birthDate: {
        type: String,
        required: true,
        // default: 0,
        validate(value){
            const current=new Date()
            value = value.split('T')[0]
            if(!validateor.isDate(value)){
                throw new Error('must be valid date')
            }
            if(value> current){
                throw new Error('Birth Date must be valid')
            }
        }
    },
    pincode:{
        type: String,
        required: true
    },
    mobileNumber:{
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
{
    timestamps: true
})

userSchema.pre('save',async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await jwt.sign(user.password, process.env.SECRET)
        const token = user.password
        user.tokens = user.tokens.concat({ token })
        return token
    }
    next()
    
})

userSchema.methods.generateAuthToken= async function (){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET)
    console.log(token)
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async (email,password)=> {
    const user = await User.findOne({email})
    console.log(user.password)
    if(!user){
        throw new Error('Unabel to login')
    }
    const hashpassword = await jwt.sign(password, process.env.SECRET)
    if(user.password === hashpassword){
        return user
    }
    else{
        throw new Error('Unabel to login 2')
    }
      
}

const User = mongoose.model('User',userSchema)


module.exports = User