
import jwt from "jsonwebtoken"

export const verifyToken = (token)=>{

    return jwt.verify(token,process.env.JWT_TOKEN,(err,decoded)=>{
        console.log('err',err)

        if(err){
            return false
        }else{
            console.log(decoded);

            return decoded
        }
    })
}
