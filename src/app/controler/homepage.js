import model from '../model'
import uploadfile from '../util/uploadfile'
class HomePage{
  static async uploads(ctx)
  {
    ctx.body=uploadfile.getUploads(ctx);
  }
  static async getTitle(ctx)
  {
    ctx.body=model.news.getTitleData(ctx.query);
  }
  static async getHtml(ctx)
  {
    ctx.body=model.news.getHtmlData(ctx.query);
  }
}
export default HomePage;
