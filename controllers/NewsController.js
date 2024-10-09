import vine, { errors } from "@vinejs/vine";
import prisma from "../db.config.js";
import NewsValidationSchema from "../validations/NewsValidation.js";
import { imageValidator, uploadImage } from "../utils/helper.js";
import NewsApiTransform from "../transform/NewsApiTransform.js";

class NewsController {
  static async getNews(req, res) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 1;
      if (page <= 0) {
        page = 1;
      }
      //    invalid limit or page
      if (limit <= 0 || limit > 100) {
        limit = 3;
      }
      //    skip valiue
      // previous page times their content
      const skip = (page - 1) * limit;

      const news = await prisma.news.findMany({
        skip: skip,
        take: limit,
        include: {
          user: {
            select: {
              name: true,
              profile: true,
              createdAt: true,
            },
          },
        },
      });
      const totalNews = await prisma.news.count();
      const totalPages = totalNews / limit;
      const newsResponse = news?.map((news) =>
        NewsApiTransform.transform(news)
      );
      return res
        .status(200)
        .json({
          newsResponse,
          medata: { currentPage: page, totalPages, limit },
        });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "something went wrong", message: err.message });
    }
  }
  static async createNews(req, res) {
    try {
      const news = req.body;
      const authUser = req.user;
      const validator = vine.compile(NewsValidationSchema);
      const data = await validator.validate(news);
      if (!req.files || Object.keys(req.files) === 0) {
        return res.status(400).json({ error: "image field is required" });
      }
      const image = req.files.image;
      console.log(image);
      const message = imageValidator(image.size, image.mimetype);
      if (message !== null) {
        return res.status(400).json({ err: message });
      }
      const imageName = uploadImage(image);
      console.log(imageName);
      data.user_id = authUser.id;
      data.image = imageName;
      console.log(data);

      const savedNews = await prisma.news.create({ data });

      return res
        .status(201)
        .json({ message: "successfully created news", savedNews });
    } catch (err) {
      if (err instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json(err.messages);
      }
    }
  }
  static async show(req, res) {
    try {
      const { id } = req.params;
      const news = await prisma.news.findFirst({
        where: {
          id: Number(id),
        },
        include:{
            user:{
                select:{
                    name:true,
                    createdAt:true,
                    profile:true
                }
            }
        }
      });
      console.log(news)
      if (!news) {
        return res.status(204).json({ message: "news not found" });
      }
      const newsResponse = NewsApiTransform.transform(news) || null;
     

      return res.status(200).json(newsResponse);
    } catch (err) {
        console.log(err)
      return res.status(500).json({ err: "something went wrong" });
    }
  }
  static async update(req,res){
    
  }
  static async destroy(req, res) {}
}
export default NewsController;
