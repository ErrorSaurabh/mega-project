import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ msg: "Authentication failed" })
  }
}

export default authMiddleware