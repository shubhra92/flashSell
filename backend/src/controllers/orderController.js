const orderModel = require('../models/orderModel');


//-----create order----
const createOrder = async (req,res) =>{
    try {
        const data = req.body
        const user_Id = req.userId

        const {address,quantity,totalPrice,product_Id}  = data
        
        if(!address) return res.status(400).send('address is required')
        if(Object.keys(address).length ===0)return res.status(400).send('address is required')
        if(!address?.city) return res.status(400).send("city is required")
        if(!address?.street)return res.status(400).send('street is required')
        if(!address?.zipcode) return res.status(400).send('zipcode is required')

        if(!quantity)return res.status(400).send("quantity is required")
        if(!Number(quantity))return res.status(400).send('quantity should be number')

        if(!totalPrice) return res.status(400).send('totalprice is required')
        if(!Number(totalPrice)) return res.status(400).send('totalPrice should be number')



        await orderModel.create({address,quantity,totalPrice,user_Id,product_Id})

        return res.status(201).send("Order create successful!")
    } catch (error) {
     return res.status(500).send(error.message)
    }
}

module.exports= {
    createOrder
}