import model from '../model'
import uploadfile from '../util/uploadfile'
class Admin{
  static async upload(ctx)
  {
    uploadfile.upload(ctx);
    ctx.body={code:0};
  }
  static async uploads(ctx)
  {
    uploadfile.getUploads(ctx);
  }
}
export default Admin;
