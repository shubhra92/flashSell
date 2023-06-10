const route = require('express').Router()
const {createUser,userLogin}= require('../controllers/userController')
const {tokenVerify,auth} = require('../auth')
const { createOrder } = require('../controllers/orderController')
const {getAllProducts,addProduct,getAllProductsQuery, updateProduct,getCategory} = require('../controllers/productController')



//----------User Route-----------------
route.post('/user/login',userLogin)
route.post('/user/signup',createUser)
// route.put('/user/update')

//----------Products Route--------------
route.get('/products',getAllProducts)
route.post('/product',addProduct)
route.get('/products/categories',getCategory)
route.get('/products/category/:category',getAllProductsQuery)
route.put('/product',auth,updateProduct)

//---------Order Route----------
route.post('/order',auth,createOrder)

//--------token-----
route.get('/token',tokenVerify)


module.exports = route