import model from '../model'
import uploadfile from '../util/uploadfile'
import message from '../util/message'
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
  static async sendMsg(ctx)
  {
    message.sendMsg(ctx.query.body,ctx.query.target,ctx.query.source);
  }
  static async getMsg(ctx)
  {
    ctx.body={msg:await message.getMsg(ctx.query.name)};
  }
}
export default HomePage;
