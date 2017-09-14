import model from '../model'
import uploadfile from '../util/uploadfile'
class HomePage{
  static async uploads(ctx)
  {
    uploadfile.getUploads(ctx);
  }
}
export default HomePage;
