import vine  from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";
vine.errorReporter=()=>new CustomErrorReporter()

export const registerSchema=vine.object({
    name:vine.string().minLength(3).maxLength(150),
    email:vine.string().email(),
    password:vine.string().minLength(3).confirmed()
})
