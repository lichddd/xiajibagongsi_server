import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import shortid from 'shortid'
import sort from '../util/sort'
import conf from '../conf'
import db_conf from './defaultdb'
class Model {
  static db = low(new FileSync(`${db_conf.db_path}news.json`))
  static getData(params)
  {
    return {news:Model.db.get('news').filter((n)=>{
      if (n.title.search(params.keyword)>=0) {
        return true;
      }
      return false;
    }).orderBy("sort","desc").take(params.limite?params.limite:9999).value()};
  }
  static getTitleData(params)
  {
    return {news:Model.db.get('news').filter((n)=>{
      if (n.title.search(params.keyword)>=0) {
        return true;
      }
      return false;
    }).orderBy("sort","desc").map((o)=>{
      console.log(conf);
      let img=(o.html.match(/<img[^>]*>/)?(o.html.match(/<img[^>]*>/)[0]?o.html.match(/<img[^>]*>/)[0]:``):``);

      if(conf.pre_uri&&img.match(conf.pre_uri)){

        img=img.replace(`src="${conf.pre_uri}`,`src="${conf.pre_uri}small/`);

      }
      else if (img.match(/src="http:\/\/|src="https:\/\//)&&img.match(/src="http:\/\/|src="https:\/\//)[0]) {

      }
      else
      {
        img=img.replace('src="','src="small/')
      }
      return {id:o.id,title:o.title,img:img};



    }).take(params.limite?params.limite:9999).value()};
  }
  static getHtmlData(params)
  {
    return {news:Model.db.get('news').find({id:params.id}).value()};
  }
  static addData(params)
  {
    Model.db.get('news').push(Object.assign({id:shortid.generate(),sort:sort.next(Model.db.get('news'))},params)).write();
  }
  static editData(params,data)
  {
    Model.db.get('news').find({ id: params.id }).assign(data).write();
  }
  static delData(params)
  {
    Model.db.get('news').remove({ id: params.id }).write();
  }
  static changeSort(data){
    Model.db.get('news').find({ id: data.ida }).assign({sort:data.sortb}).value();
    Model.db.get('news').find({ id: data.idb }).assign({sort:data.sorta}).value();
    Model.db.write();
  }
  static count(){
    return Model.db.get('news').size().value();
  }
}
export default Model
