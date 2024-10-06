import vine, { errors } from "@vinejs/vine"
import { registerSchema } from "../validations/AuthValidation.js"
import prisma from "../db.config.js"
import bcrypt from "bcryptjs"

class AuthController {
    
     static async  register(req,res){
       
 try{
    const user=req.body
    const validator=vine.compile(registerSchema)
    const data= await validator.validate(user)
    console.log(data)
    const salt=bcrypt.genSaltSync(10)
    const hash=bcrypt.hashSync(data.password,salt)
    data.password=hash
     await prisma.user.create({
        data:data
     })

    return res.status(201).json({message:"user created successfully"})
 }
      
 catch(error){
    console.log(error)

    if (error instanceof errors.E_VALIDATION_ERROR){
        return res.status(400).json(error.messages)
    }
return res.status(500).json({message:"something went wrong on the server"})
 }


     }
}
export default AuthController