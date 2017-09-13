import Router from 'koa-router'
import controler from '../controler'
let home = new Router()
home.get('zhihu/themes', controler.themes)
    .get(`zhihu/theme/:id`,controler.theme)
    .get(`zhihu/news/latest`,controler.latest)
    .get(`zhihu/news/:id`,controler.news);
let router = new Router();
router.use('/', home.routes(), home.allowedMethods())
export default router;
