import { supportedMimes } from "../config/fileSystem.js"
import { v4 as uuid } from "uuid"
import fs from "fs"

export const imageValidator=(size,mime)=>{
    if(bytesToMb(size)>2){
        return "image must be less than 2mb"
    }
    // if size <2
    else if(!supportedMimes.includes(mime)){
        return "image is not supported"
    }
    return null

}
const bytesToMb=(bytes)=>{
    return bytes/(1024*1024)
}
export const generateRandomNum=()=>{
    return uuid()
}
export const uploadImage=(image)=>{
    const imgExt=image.name.split(".")[1]
    const imageName=generateRandomNum()+"."+imgExt
    const uploadPath=process.cwd()+"/public/images/"+imageName
    console.log(uploadPath)
    image.mv(uploadPath,(err)=>{
       if(err) throw err

    }
    )
    return imageName


}
export const getImageUrl=(imageName)=>{
    return `${process.env.APP_URL}/images/${imageName}`
}
export const removeImage=(imageName)=>{
    const filePath=process.cwd()+"/public/images"+imageName
    if(fs.existsSync(filePath)) fs.unlinkSync(filePath)
}