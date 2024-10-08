import express from "express";
import "dotenv/config"
import AuthRoutes from "./routes/AuthRoutes.js";
import  fileUpload from "express-fileupload"
import ProfRoutes from "./routes/ProfRoutes.js"
import NewsRoutes from "./routes/NewsRoutes.js"
const app=express()
const PORT=process.env.PORT || 8000
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(fileUpload())
app.use(express.static("public"))
app.use("/api/v1/auth",AuthRoutes);
app.use("/api/v1/profile",ProfRoutes)
app.use("/api/v1/news",NewsRoutes)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})