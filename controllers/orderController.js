// import Order from "../model/Order.js";

// // Create a new order
// export const createOrder = async (req, res) => {
//     try {
//       const {
//         user,
//         orderItems,
//         shippingAddress,
//         orderNumber,
//         paymentMethod,
//         deliverAt,
//       } = req.body;
  
//       // Create the order
//       const order = await Order.create({
//         user,
//         orderItems,
//         shippingAddress,
//         orderNumber,
//         paymentMethod,
//         deliverAt,
//       });
  
//       res.status(201).json({ success: true, message: 'Order created successfully', order });
//     } catch (error) {
//       console.error(error);
//       res.status(400).json({ success: false, message: 'Unable to create order' });
//     }
//   };
  
  // find the user 
  // get the payload(custommer,orderitem,shippingaddress,totalprice)chek it if order is not empty
  // save into db ordertable 
  // update the orderquantity and "make a quantity"
  //payment webhook
  // update the user order

  import Order from "../model/Order.js";
  import User from "../model/User.js"; // Assuming you have a User model
  
  // Create a new order
  export const createOrder = async (req, res) => {
    try {
      const {
        user,
        orderItems,
        shippingAddress,
        orderNumber,
        paymentMethod,
        deliverAt,
      } = req.body;
  
      // Find the user
      const foundUser = await User.findById(user); // Assuming you are using MongoDB and have a findById method
  
      if (!foundUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Check if order is empty
      if (orderItems.length === 0) {
        return res.status(400).json({ success: false, message: 'Order is empty' });
      }
  
      // Calculate the total price and update the order quantity
      let totalPrice = 0;
  
      const updatedOrderItems = orderItems.map((item) => {
        const { productId, quantity } = item;
        totalPrice += quantity * item.price;
  
        return {
          productId,
          quantity,
        };
      });
  
      // Create the order
      const order = await Order.create({
        user,
        orderItems: updatedOrderItems,
        shippingAddress,
        orderNumber,
        paymentMethod,
        deliverAt,
        totalPrice,
      });
  
      // Update the user's order list
      foundUser.orders.push(order._id);
      await foundUser.save();
  
      // Perform additional operations based on the payment status from the webhook
      const { paymentStatus } = req.body;
  
      if (paymentStatus === 'succeeded') {
        // Payment succeeded, update the order status accordingly
        order.paymentStatus = paymentStatus;
        order.paymentDate = new Date();
        await order.save();
      } else {
        // Payment failed or pending, handle accordingly
        // You can update the order status or take appropriate actions
      }
  
      res.status(201).json({ success: true, message: 'Order created successfully', order });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, message: 'Unable to create order' });
    }
  };