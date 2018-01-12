import plugin from './app/plugin'

import path from 'path'
import Koa from 'koa'
import koaBody from 'koa-body'
import router from './app/router'
import bodyParser from 'koa-bodyparser'
import koa_static from 'koa-static'
import token from './app/util/token'
import visit from './app/util/visit'
import fileutil from './app/util/fileutil'
import uploadfile from './app/util/uploadfile'


let app = new Koa();

fileutil.mkdirIfNotExist('./web/');

app.use(visit.visit);
app.use(koa_static(path.resolve('./web')));
app.use(koa_static(path.resolve(uploadfile.img_path)));
app.use(async (ctx,next)=>{
  try {await next();}
  catch (e) {
    console.error(e);
    ctx.body=Object.assign({code:1,desc:e.toString()},ctx.body);
  }
  ctx.body=Object.assign({code:0},ctx.body);
});
app.use(koaBody({ multipart: true }));
app.use(token.token);
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(8081);
console.log('[demo] start-quick is starting at port 8081');
