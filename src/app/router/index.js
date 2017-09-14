import Router from 'koa-router'
import controler from '../controler'

let homepage = new Router()
homepage.get('uploads', controler.homepage.uploads);

let admin = new Router()
admin.get('uploads', controler.admin.uploads)
     .post('upload', controler.admin.upload);

let router = new Router();
router.use('/', homepage.routes(), homepage.allowedMethods());
router.use('/admin/', admin.routes(), admin.allowedMethods())


export default router;
