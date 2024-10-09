import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";
vine.errorReporter=()=> new CustomErrorReporter()

const NewsValidationSchema=vine.object({
    title:vine.string().minLength(5).maxLength(100),
    content:vine.string().minLength(10).maxLength(1000)
})
export default NewsValidationSchema