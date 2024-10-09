import { getImageUrl } from "../utils/helper.js";

class NewsApiTransform{
    static transform(news){
        return {
            title:news.title,
            content:news.content,
            image:getImageUrl(news.image),
            reporter:{
               name: news.user.name,
               create_at:news.user.createdAt,
               profile:news.user?.profile!==null? getImageUrl(news.user.profile):process.env.AVATAR_URL
            }
            
            

        }
    }
}
export default NewsApiTransform