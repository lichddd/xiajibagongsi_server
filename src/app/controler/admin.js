import model from '../model'
import uploadfile from '../util/uploadfile'
import message from '../util/message'
import conf from '../conf'
class Admin{
  static async upload(ctx)
  {
    let urllist=[];
    for (var file in ctx.request.body.files) {
      if (ctx.request.body.files[file].path) {
          // let pre_uri=process.env.NODE_ENV=="development"?"http://localhost:8081/":"";
          urllist.push(conf.pre_uri+await uploadfile.upload(ctx.request.body.files[file]));
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
    model.news.editData(ctx.params,ctx.request.body);
  }
  static async addnews(ctx)
  {
    model.news.addData(ctx.request.body);
  }
  static async delnews(ctx)
  {
    model.news.delData(ctx.params);
  }
  static async getnews(ctx)
  {
    ctx.body=model.news.getData(ctx.query);
  }
  static async changenewssort(ctx)
  {
    model.news.changeSort(ctx.request.body);
  }
  static async info(ctx)
  {
    ctx.body={};
    let {allsize,dbsize,filecount,maxsize}=uploadfile.info()
    ctx.body=Object.assign(ctx.body,{info:{allsize,dbsize,maxsize,filecount,newscount:model.news.count(),visit:model.visit.getData()}});

  }
  static async sendMsg(ctx)
  {
    message.sendMsg(ctx.request.body.body,ctx.request.body.target,ctx.request.body.source);
  }
  static async getMsg(ctx)
  {
    ctx.body={msg:await message.getMsg(ctx.query.name,ctx.query.lastID)};
  }
}
export default Admin;
