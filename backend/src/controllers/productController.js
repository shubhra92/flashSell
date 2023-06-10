const productModel = require('../models/productModel');


//----------get All groduct------
const getAllProducts = async(req,res)=>{
    try {
        const {limit,skip} = req.query
        const {category} = req.params

        const allProducts = await productModel.find().limit(limit).skip(skip)

        return res.status(200).send(allProducts)

    } catch (error) {
        return res,status(500).send(error.message)
    }
}

//----------get All groduct------
const getAllProductsQuery = async(req,res)=>{
    try {
        const {limit,skip} = req.query
        const {category} = req.params


        const allProducts = await productModel.find({category}).limit(limit).skip(skip)

        return res.status(200).send(allProducts)

    } catch (error) {
        return res,status(500).send(error.message)
    }
}


const addProduct = async (req,res) => {
    try{
        const data = req.body
        if(Object.keys(data).length===0)return res.status(400).send('request body empty')
        const {title,price,description,category,image,quantity,rating}=data
        if(!title)return res.status(400).send('title is required')
        if(!price)return res.status(400).send('price is required')
        if(!category) return res.status(400).send('category is required')
        if(!image) return res.status(400).send('image link is required')
        if(!quantity) return res.status(400).send('quantity is required')

        const productData = await productModel.create({title,price,description,category,image,quantity,rating});

        return res.status(201).send({msg:'product create successful',productData})

    }catch(err){
        return err.status(500).send(err.message)
    }
}

const updateProduct = async (req,res) => {
    try {
        const data = req.body
        const userType = req.userType
        if(userType!=='admin') return res.status(403).send('forbidden')
        const product = await productModel.updateOne({_id:data.product_Id},data)
        if(!product) return res.status(404).send('product not found')
        return res.status(201).send(product)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}
const getCategory = (_,res)=>{
    res.status(200).send(["electronics","jewelery","men's clothing","women's clothing"])
}

module.exports={
    getAllProducts,
    addProduct,
    getAllProductsQuery,
    updateProduct,
    getCategory
}
