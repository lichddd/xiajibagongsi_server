import model from '../model'
import uploadfile from '../util/uploadfile'
class Admin{
  static async upload(ctx)
  {
    uploadfile.upload(ctx.request.body.files.file);
    ctx.body={code:0};
  }
  static async uploads(ctx)
  {
    ctx.body=Object.assign({code:0},uploadfile.getUploads());
  }
  static async deluploaded(ctx)
  {
    uploadfile.delUploaded(ctx.params.name);
    ctx.body={code:0};
  }
}
export default Admin;
