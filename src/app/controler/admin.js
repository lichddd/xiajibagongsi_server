import model from '../model'
import uploadfile from '../util/uploadfile'
import news from '../model/news'
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

    ctx.body={errno: 0,data: urllist,};
  }
  static async uploads(ctx)
  {
    ctx.body=uploadfile.getUploads();
  }
  static async deluploaded(ctx)
  {
    uploadfile.delUploaded(ctx.params.name);
  }
  static async editnews(ctx)
  {
    news.editData(ctx.params,ctx.request.body);
  }
  static async addnews(ctx)
  {
    news.addData(ctx.request.body);
  }
  static async delnews(ctx)
  {
    news.delData(ctx.params);
  }
  static async getnews(ctx)
  {
    ctx.body=news.getData(ctx.query);
  }
}
export default Admin;
