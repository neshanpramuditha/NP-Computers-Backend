import { response } from "express";
import Order from "../models/order.js";
import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createOrder(req, res){

    if(req.user == null){
        res.status(401).json({message:"Unauthorized, Please log in to place an order."})
    }
    // Genarate Order ID (EX -: ORD000001)
    try{
    const orderData = {
        orderID:"ORD000001",
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        addressLine1:req.body.addressLine1,
        addressLine2:req.body.addressLine2,
        city:req.body.city,
        country:req.body.country,
        postalCode:req.body.postalCode,
        email:req.body.email,
        items:[],
        phone:req.body.phone,
        total:0
    }

    if(orderData.firstName == ""){
        orderData.firstName = req.user.firstName
    }
    if(orderData.lastName == ""){
        orderData.lastName = req.user.lastName
    }
    if(!orderData.email){
        orderData.email = req.user.email
    }
    if(orderData.addressLine1 == ""){
        res.status(400).json({message: "Address line 1 is required"})
        return
    }
    if(orderData.addressLine2 == ""){
        res.status(400).json({message: "Address line 2 is required"})
        return
    }
    if(orderData.city == ""){
        res.status(400).json({message: "City is required"})
        return
    }
    if(orderData.country == ""){
        res.status(400).json({message: "Country is required"})
        return
    }
    if(orderData.postalCode == ""){
        res.status(400).json({message: "Postal code is required"})
        return
    }
    const lastOrder = await Order.findOne().sort({date : -1}) //Find the last order

    //last order එකක් තියෙනව නම් 
    if(lastOrder != null){
        const lastOrderID = lastOrder.orderID //Ex-"ORD0000001"
        const lastOrderNumberInString = lastOrderID.replace("ORD","") //Ex-"0000001"
        const lastOrderNumber =  parseInt(lastOrderNumberInString) // Ex - 0000001

        const newOrderNumber = lastOrderNumber + 1 //Ex-2
        const newOrderNumberInString = newOrderNumber.toString().padStart(6,"0") //Ex-0000002

        orderData.orderID = "ORD"+newOrderNumberInString //Ex-"ORD0000002"
    }
    for (let i = 0; i < req.body.items.length; i++){
        
        const item = req.body.items[i]

        const product = await Product.findOne({productID:item.productID})

        if(product == null){
            
            res.status(404).json({message:"Product with ID " + item.productID + " not found. Please remove it from your cart and try agin..."})
            return
        }

        if(product.isVisible == false){
            res.status(404).json({message:"Product with ID " + item.productID + " is not available. Please remove it from your cart and try agin..."})
            return
        }

        // if(product.qty < item.qty){
        //     res.status(404).json({message:"Only " + product.qty + " items available for product with ID " + item.productID + "."})
        // }

        orderData.items.push({
            productID:product.productID,
            name:product.name,
            price:product.price,
            labelledPrice:product.labelledPrice,
            image:product.images?.[0],
            qty:item.qty
        })

        orderData.total += product.price * item.qty
    }

    const order = new Order(orderData)
    await order.save()

    // for(let i = 0; i < orderData.items.length; i++){
    //     const item = orderData.items[i]
    //     await Product.updateOne({productID:item.productID}, {$inc:{qty: -item.qty}})
    // }

    res.status(201).json({message:"Order created successfully", orderID:orderData.orderID})

    }catch(error){
        console.log("Error creating order!")
        console.log(error.message)
        console.log(error.stack)
        
        res.status(500).json({message: "Error creating order!", error: error})
    }
    
}

export async function getOrders(req,res) {

    if(req.user == null){
        res.status(401).json({message: "Unauthorized. please log in to view your orders"})
        return
    }

    if(isAdmin(req)){
        
    }
    
}