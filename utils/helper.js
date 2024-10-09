import { supportedMimes } from "../config/fileSystem.js"
import { v4 as uuid } from "uuid"

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