import express from "express";
import "dotenv/config";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import AuthRoutes from "./routes/AuthRoutes.js";
import ProfRoutes from "./routes/ProfRoutes.js";
import NewsRoutes from "./routes/NewsRoutes.js";
import { rateLimiter } from "./config/rateLimter.js";
import redisCache from "./DB/redis.config.js";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(helmet());
app.use(rateLimiter);
app.use(express.static("public"));

// Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/profile", ProfRoutes);
app.use("/api/v1/news", redisCache.route(), NewsRoutes);
const swaggerDefinition={
  openapi: "3.0.0",
  info: {
    title: "News App API",
    version: "1.0.0",
    description: "API for managing news",
  },
  servers: [
    {
      url: "http://localhost:8000",
    },
  ],
}
const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ["./routes/*.js"],
};
const swaggerSpec=swaggerJSDoc(options)
// app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
