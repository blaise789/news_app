import vine, { errors } from "@vinejs/vine";
import { loginSchema, registerSchema } from "../validations/AuthValidation.js";
import prisma from "../db.config.js";
import  bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

class AuthController {
  static async register(req, res) {
    try {
      const user = req.body;
      const validator = vine.compile(registerSchema);
      const data = await validator.validate(user);
      console.log(data);
      const userExists = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (userExists) {
        return res.status(400).json({ message: "user already exists" });
      }
      const salt = bcrypt.genSaltSync(10);

      const hash = bcrypt.hashSync(data.password, salt);
      data.password = hash;
      await prisma.user.create({
        data: data,
      });

      return res.status(201).json({ message: "user created successfully" });
    } catch (error) {
      console.log(error);

      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json(error.messages);
      }
      return res
        .status(500)
        .json({ message: "something went wrong on the server" });
    }
  }
  static async login(req, res) {
    try {
      const user = req.body;
      const validator = vine.compile(loginSchema);
      const data = await validator.validate(user);

      const userExists = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if(userExists==null){
        return res.status(404).json({message:"user not found"})

      }
      const passwordMatches=   bcrypt.compareSync(data.password,userExists.password)
      console.log(passwordMatches)
       if(!passwordMatches){
      return res.status(403).json({message:"invalid email or password"})


      }
      const payload={
        email:userExists.email
      }
    //   issue json web token
    const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"10m"
        
    })

    console.log(token)
      
      return res.status(200).json({message:"access token",accessToken:`Bearer ${token}`})

    } catch (err) {
      if (err instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json( err.messages );
      }
    }
  }
}
export default AuthController;
