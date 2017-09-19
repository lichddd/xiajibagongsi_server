import model from '../model'
import uploadfile from '../util/uploadfile'
class Admin{
  static async upload(ctx)
  {
    let urllist=[];
    for (var file in ctx.request.body.files) {
      if (ctx.request.body.files[file].path) {
          let pre_uri=process.env.NODE_ENV=="development"?"http://localhost:8081/":"";
          urllist.push(pre_uri+uploadfile.upload(ctx.request.body.files[file]));
      }
    }

    ctx.body=Object.assign({code:0},{errno: 0,data: urllist,});
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
