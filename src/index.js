import path from 'path'
import Koa from 'koa'
import router from './app/router'
import bodyParser from 'koa-bodyparser'
import koa_static from 'koa-static'
let app = new Koa();
app.use(async (ctx,next)=>{
  try {await next();}
  catch (e) {
    console.error(e);
    ctx.body=e;
  }
  finally {}
});
app.use(koa_static(path.join( __dirname,  '../web')));
app.use(async (ctx,next)=>{
    if (ctx.cookies.get("token")) {
      console.log(ctx.cookies.get("token"));
      await next();
    } else {
      ctx.cookies.set("token","token");
      throw "傻逼，你没登录";
    }
});
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(8080);
console.log('[demo] start-quick is starting at port 8080');
