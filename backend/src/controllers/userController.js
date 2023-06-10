const userModel = require('../models/userModel')
const jwt  = require('jsonwebtoken');
const secrect = 'dummy secrect'


//--------crete User---------

const createUser = async (req,res) => {
    try {
        const  data = req.body
        if(Object.keys(data).length===0) return res.status(400).send("Request body empty");
        const {name:{fname,lname},phone,email,password,address,type} = data

        const userData = await userModel.create({name:{fname,lname},phone,email,password,address,type})

        return res.status(201).send({name:userData.name,phone:userData.phone,email:userData.email})


    } catch (error) {
        return res.status(500).send(error.message)
    }
}


//------------user Login ------------------

const userLogin = async (req,res) => {
    try {
        const {email,password} = req.body
        if(!email && !password) return res.status(400).send('email and password are required')
        if(!email)return res.status(400).send('email is required')
        if(!password) return res.status(400).send('password is required')

        const user = await userModel.findOne({email,password})
        if(!user) return res.status(400).send('nvalid Credentials')

        //crete token
        const payload = {user_id:user._id,name:user.name,email:user.email,address:user.address,type:user?.type}
        const expire = '1D'
        const token = jwt.sign(payload,secrect,{expiresIn: expire})

        return res.status(200).send(token)

        
    } catch (error) {
        return res.status(500).send(error.message) 
    }
}


//-----update user----------
const updateUser = async (req,res) => {
    try {
        const userId = req.userId
        const data = req.body
        if(Object.keys(data).length===0)return res.status(400).send('request body empty')
        const {name,address,phone,email} = data

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    createUser,
    userLogin,
    secrect
}