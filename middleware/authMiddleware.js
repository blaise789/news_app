import jwt from "jsonwebtoken"
export const authMiddleware=(req,res,next)=>{
    
    const authHeader=req.headers.authorization
    if(authHeader==null || authHeader==undefined){
       return res.status(401).json({error:"not authorized"})

    }
    const token=authHeader.split(" ")[1]
    jwt.verify(token,process.env.JWT_SECRET,(req,res)=>{
        req.user=user

    })

    
}