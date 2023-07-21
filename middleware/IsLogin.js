
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";
export const isLogin =  (req, res, next) => {
  // get token from header
  const token = getTokenFromHeader(req)
  // verify the token
  //   // console.log(token)

  const decodedUser = verifyToken(token)

  // // console.log(token)
  if(!decodedUser){
      throw new Error("Invalid/Expired token ,please login again")
  }else{
      // save the user into req obj
      req.useAuthId= decodedUser?.id;
      next()
  }
}

export default isLogin;