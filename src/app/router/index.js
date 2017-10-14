import Router from 'koa-router'
import controler from '../controler'

let homepage = new Router();
homepage.get('uploads', controler.homepage.uploads)
        .get('getTitle', controler.homepage.getTitle)
        .get('sendMsg', controler.homepage.sendMsg)
        .get('getMsg', controler.homepage.getMsg)
        .get('getHtml', controler.homepage.getHtml);
let login = new Router();
login.post('login', controler.login.login);
let admin = new Router();
admin.get('info', controler.admin.info)
     .get('uploads', controler.admin.uploads)
     .del('deluploaded/:name', controler.admin.deluploaded)
     .post('upload', controler.admin.upload)
     .get('getnews', controler.admin.getnews)
     .post('addnews', controler.admin.addnews)
     .put('editnews/:id', controler.admin.editnews)
     .del('delnews/:id', controler.admin.delnews)
     .post('changenewssort',controler.admin.changenewssort)
     .post('sendMsg', controler.admin.sendMsg)
     .get('getMsg', controler.admin.getMsg);

let router = new Router();
router.use('/homepage', homepage.routes(), homepage.allowedMethods());
router.use('/admin/', admin.routes(), admin.allowedMethods());
router.use('/', login.routes(), login.allowedMethods());

export default router;
