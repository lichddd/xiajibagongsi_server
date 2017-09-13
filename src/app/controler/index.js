import Router from 'koa-router'
import model from '../model'
class Controler{
  static async themes(ctx)
  {
    ctx.body=await model.getData(`themes`);
  }
  static async theme(ctx)
  {
    ctx.body=await model.getData(`theme/${ctx.params.id}`);
  }
  static async latest(ctx)
  {
    ctx.body=await model.getData(`news/latest`);
  }
  static async news(ctx)
  {
    ctx.body=await model.getData(`news/${ctx.params.id}`);
  }

}
export default Controler;
