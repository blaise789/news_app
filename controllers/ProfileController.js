import prisma from "../DB/db.config.js"
import { generateRandomNum, imageValidator } from "../utils/helper.js"

class ProfileController{

    static async getProfile(req,res){
        try{
    const authUser=req.user

    const user=await prisma.user.findUnique({
        where:{
            email:authUser?.email
        }
    })
     return res.status(200).json(user)
        }
        catch(err){
            return res.status(500).json({error:"something went wrong "})
        }

    }
    // static createProfile(){

    // }
    // static async show(){

    // }
    static async update(req,res){
        try{
            if(!req.files || Object.keys(req.files)===0){
                return res.status(400).json({error:"image field is required"})

            } 
            const profile=req.files.profile
            const message=imageValidator(profile?.size,profile?.mimetype)

            if(message!==null){
                return res.status(400).json({err:message})
            }
            const imgExt=profile.name.split(".")[1]
            const imgName=generateRandomNum()+"."+imgExt
            const uploadPath=process.cwd()+"/public/images/"+imgName
            profile.mv(uploadPath,(err)=>{
                if(err)  throw err

            })
            await prisma.user.update({
                data:{
                    profile:imgName
                },
                where:{
                    id:req.user.id
                 
                }
            })
            return res.status(200).json({message:"user profile updated successfully"})

            
    

            
            
        }
    catch(err){
        return res.status(500).json({message:"something went wrong"})
    }

    }
    // static async destroy(){

    // }
}
export default ProfileController