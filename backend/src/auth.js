const jwt = require('jsonwebtoken');
const { secrect } = require('./controllers/userController');
const userModel = require('./models/userModel');



const tokenVerify = (req,res)=>{
    {
        try{
        let token = req.headers.authorization
        if(!token) return res.status(400).send('token missing')
        token = token.split(' ')[1]

        const decodeData = jwt.verify(token,secrect,function (err,data){
            if(err){
                return null
            }
            return data
        })
        return res.status(200).send(decodeData)
    }catch(err){
        return res.status(500).send(err.message)
    }
}

}

const auth =async  (req,res,next) =>{
    try {
        let token = req.headers.authorization
        if(!token) return res.status(400).send('token missing')
        token = token.split(' ')[1]

        const decodeData = jwt.verify(token,secrect,function (err,data){
            if(err){
                return err.message
            }
            return data
        })

        if(typeof decodeData === 'string')return res.status(401).send('invalid token')

       const checkUser = await userModel.findById(decodeData?.user_id)
       if(!checkUser) return res.status(404).send('user not found')

       req.userId=checkUser._id
       req.userType = decodeData.type

       next()
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {tokenVerify,auth}