import express from "express";
import "dotenv/config"
import AuthController from "./controllers/AuthController.js";
import AuthRoutes from "./routes/AuthRoutes.js";
const app=express()
const PORT=process.env.PORT || 8000
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/v1/auth",AuthRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})