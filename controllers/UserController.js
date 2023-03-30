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
console.log(process.env.JWT_SECRET); // Check the value of the JWT_SECRET environment variable
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: "30d"
})


  return res.status(200).json({
    msg: "Login successful",
    data: user,
    token:token
  })
})




