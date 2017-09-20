import Router from 'koa-router'
import controler from '../controler'

let homepage = new Router()
homepage.get('uploads', controler.homepage.uploads);

let admin = new Router()
admin.get('uploads', controler.admin.uploads)
     .del('deluploaded/:name', controler.admin.deluploaded)
     .post('upload', controler.admin.upload)
     .get('getnews', controler.admin.getnews)
     .post('addnews', controler.admin.addnews)
     .put('editnews/:id', controler.admin.editnews)
     .del('delnews/:id', controler.admin.delnews);

let router = new Router();
router.use('/', homepage.routes(), homepage.allowedMethods());
router.use('/admin/', admin.routes(), admin.allowedMethods())


export default router;
