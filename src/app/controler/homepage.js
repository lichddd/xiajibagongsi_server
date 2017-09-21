import model from '../model'
import uploadfile from '../util/uploadfile'
class HomePage{
  static async uploads(ctx)
  {
    ctx.body=uploadfile.getUploads(ctx);
  }
}
export default HomePage;
