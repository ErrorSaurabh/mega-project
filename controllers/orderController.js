import asyncHandler from "express-async-handler"
import dotenv from "dotenv"
dotenv.config()

import User from "../model/User.js"
import Order from "../model/Order.js"
import {Product} from "../model/Product.js"
import Stripe from "stripe"
import Coupon from "../model/Coupon.js"

// Stripe instamce
const stripe = new Stripe(process.env.STRIPE_KEY)

//  Product Create
export const createOrder = asyncHandler(
  async (req, res) => {
      // get coupon discount
      const {coupon} = req?.query;
      const couponFound =await Coupon.findOne({
          code:coupon?.toUpperCase(),
      })
      if(couponFound?.isExpired){
          throw new Error("Coupon has expired")
      }
      if(!couponFound){
          throw new Error("Coupon not found")
      }
      // get discount 
      const discount = couponFound?.discount / 100;
      // get the payload(customer,orderItems,shippingAddress,totalPrice) 
      const {orderItems,shippingAddress,totalPrice} = req.body

      // Find the user

      const user = await User.findById(req.useAuthId);
      console.log('user',user)

      // check if user has Shipping address
      if(user?.hasShippingAddress){
          throw new Error("Please provide shipping address")
      }
      // Check if order is not empty
      if(orderItems?.length <=0){
          throw new Error("No Order Items")
      }
      // Place/create order - save into DB
      console.log('totalPrice',totalPrice)
      const order = await Order.create({
          user:user?._id,
          orderItems,
          shippingAddress,
          totalPrice:couponFound ? totalPrice - totalPrice * discount : totalPrice,
      })
  
      // Update the product qty
      const products = await Product.find({_id:{$in:orderItems}})
      orderItems?.map(async(order)=>{
          const product = products?.find((product)=>{
              return product?._id?.toString() === order?._id?.toString()
          })
          console.log('order',order)
          if(product){
              // product.totalSold += order.totalQty
              product.totalSold += order.quantity
          }
          await product.save();
      })
      // push order into user
      user.orders.push(order?._id)
      await user.save()
      // console.log(products);
      // convert order item to have same strc that stripe need
      const convertedOrders = orderItems.map((item)=>{
          return {
          price_data: {
              currency:"inr",
              product_data:{
                  name:item?.name,
                  description:item?.description,
              },
              unit_amount:item?.price*100
          },
          quantity: item?.quantity,
        };
      });
      // make payment (stripe)

      const session = await stripe.checkout.sessions.create({
          line_items: convertedOrders,
          metadata:{
              orderId:JSON.stringify(order?._id),
          },
          mode: 'payment',
          success_url:'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000/cancel',
        });
      
        res.send({url: session.url});
      // Payment webhook
      
      // Update the user order

      // res.json({
      //     success:true,
      //     message:"Order Created Successfully",
      //     order,
      //     user

      // })

  }
)

// GetProducts

export const GetOrders = asyncHandler(
  async (req, res) => {
      // query
      let orderQuery = Order.find();
      
      // await the query

      const orders = await orderQuery;

      res.json({
          status: 'success',
          message: "Orders fetched successfully",
          orders
      })
  }
)

// GetOrder

export const GetOrder = asyncHandler(
  async (req, res) => {

      const order = await Order.findById(req.params.id)
      if (!order) {
          throw new Error('Order not exists')

      }
      res.json({
          status: 'success',
          message: "Order Fetched Successfully",
          data: order
      })
  }
)

// updateProduct

export const updateOrder = asyncHandler(
  async (req, res) => {
      const id = req.params.id
      const order = await Order.findByIdAndUpdate(id, {
         status:req.body.status
      }, {
          new: true,
      })

      res.json({
          status: 'success',
          message: "Order Update Successfully",
          data: order
      })
  }
)


// total sales 
export const getOrderStats = asyncHandler(async(req,res)=>{

  // get Minium Order

const orders = await Order.aggregate([
      {
      $group:{
          _id:null,
          totalSales:{
              $sum:"$totalPrice",
          },
          minimumSale:{
              $min:"$totalPrice",
                      
          },
          maximumSale:{
              $max:"$totalPrice",       
          },
          avgSale:{
              $avg:"$totalPrice",       
          },


      }
  }
  ])

    // get the date
    const date = new Date();
    const today = new Date(date.getFullYear(),date.getMonth(),date.getDate())
    const salesToday = await Order.aggregate([
        {
            $match:{
                createdAt:{
                    $gte:today,
                }
            }
        },
        {
            $group: {
              _id: null,
              totalSales: {
                $sum: "$totalPrice"
              }
            }
        }
    ])
      // send response

      res.status(200).json({
        success:true,
        message:"Sum  of orders",
        orders,
        today,
        salesToday
  }
)
})
