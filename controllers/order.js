const Cart = require("../models/cart");
const Product = require("../models/product");
const CartItem = require("../models/cart-item");
const Order = require("../models/order");
const OrderItem = require("../models/order-item");
const user = require("../models/user");


exports.createOrder = (req,res,next)=>{
    let order = req.user.createOrder() 
    let myOrders = []
    req.user.getCart()
    .then(cart=>{
        console.log('Inside CartItems',cart)
        cart.getProducts()
        .then(products=>{
            console.log('Inside Cart',products)
            for(let i=0;i<products.length;i++) {
                console.log(products[i])
                let order_items =  order.addProduct(products[i] , { 
                    through : {quantity : products[i].cartItem.quantity} })
            myOrders.push(order_items)
           }
           res.json({ data:myOrders, success : true})
        })
        .catch(err=>res.status(500).json(err))
    })
    .catch((err)=>{
         res.status(500).json({success:false})
    })
 }


 exports.showOrder = (req,res,next)=>{
    let Orders=[]
    let userId = req.user.id
    user.findAll({where :{id:userId}})
    .then(user=>{
        user.Order.findAll(orders=>{
         Orders.push(orders)
        })
        res.json({data:Orders, success: true})
    })
    .catch((err)=>{
        res.status(500).json({success:false})
 })
}