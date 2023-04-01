import jwt  from "jsonwebtoken"
import User from "../model/User.js"

const isLogin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" })
  }
}

export default isLogin;

// import jwt from "jsonwebtoken"
// import asyncHandler from "express-async-handler"
// import User from "../model/User.js"

// const protect = asyncHandler(async (req, res, next) => {
//   let token

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1]

//       const decoded = jwt.verify(token, process.env.JWT_SECRET)

//       req.user = await User.findById(decoded.id).select("-password")

//       next()
//     } catch (error) {
//       console.error(error)
//       res.status(401)
//       throw new Error("Not authorized, token failed")
//     }
//   }

//   if (!token) {
//     res.status(401)
//     throw new Error("Not authorized, no token")
//   }
// })

// export default protect
