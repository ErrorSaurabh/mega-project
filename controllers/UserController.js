// Import the user object from the user.js module
import User from "../model/User.js"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import jwt  from "jsonwebtoken"

export const Register = async (req, res) => {
  const { full_name, email, password } = req.body

  // Hash the password
  const salt = await bcrypt.genSalt(10)

  const hashedPassword = await bcrypt.hash(password, salt)

  // Save the user with the hashed password
  const user = await User.create({
    full_name,
    email,
    password: hashedPassword
  })

  // console.log(process.env.JWT_SECRET); // Check the value of the JWT_SECRET environment variable
  // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  //   expiresIn: "30d"
  // })

  return res.status(201).json({
    msg: "Data Inserted Successfully",
    data: user
    // token
  })
}
// API
// http://localhost:1000/api/users/register

export const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error("Invalid email or password")
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return res.status(401).json({ msg: 'Invalid email or password' })
  }
console.log(process.env.JWT_TOKEN); // Check the value of the JWT_SECRET environment variable
const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
  expiresIn: "30d"
})


  return res.status(200).json({
    msg: "Login successful",
    data: user,
    token:token
  })
})
// API
// http://localhost:1000/api/users/login

// GET Profile
export const getProfile = asyncHandler(

  async (req, res) => {
      const user = await User.findById(req.useAuthId).populate('orders')
      res.json({
          success:true,
          message: "User Order Profile Fetched",
          user
      })
  }
)

// Fill shipping Address 
export const updateShippingAddress = asyncHandler(async (req, res) => {
  console.log('req',req)
  const {
    firstName,
    lastName,
    address,
    city,
    postalcode,
    province,
    phone
  } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.useAuthId,
    {
      shippingAddress: {
        firstName,
        lastName,
        address,
        city,
        postalcode,
        province,
        phone
      },
      hasShippingAddress: true
    },
    { new: true }
  );

  res.json({
    success: true,
    message: "Updated Shipping Address",
    user: updatedUser
  });
});


// export const updateShippingAddress = asyncHandler(async (req, res) => {
//   const {
//     firstName,
//     lastName,
//     address,
//     city,
//     postalcode,
//     province,
//     phone
//   } = req.body;

//   const userId = req.userAuthId; // Use req.userAuthId as the user ID

//   try {
//     const user = await User.findById(userId);

//     if (user) {
//       user.shippingAddress = {
//         firstName,
//         lastName,
//         address,
//         city,
//         postalcode,
//         province,
//         phone
//       };
//       user.hasShippingAddress = true;

//       user.orders.push(order?._id); // Add the order ID to the user's orders array

//       await user.save(); // Save the updated user

//       res.json({
//         success: true,
//         message: "Updated Shipping Address",
//         user
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message
//     });
//   }
// });
