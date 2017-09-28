import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import shortid from 'shortid'
import sort from '../util/sort'

class Model {
  static db = low(new FileSync('db/news.json'))
  static getData(params)
  {
    return {news:Model.db.get('news').filter((n)=>{
      if (n.title.search(params.keyword)>=0) {
        return true;
      }
      return false;
    }).orderBy("sort","desc").take(params.limite?params.limite:9999).value()};
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
