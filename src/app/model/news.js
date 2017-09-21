import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import shortid from 'shortid'

class Model {
  static db = low(new FileSync('db/news.json'))
  static getData(params)
  {
    return {news:Model.db.get('news').filter((n)=>{
      if (n.title.search(params.keyword)>=0) {
        return true;
      }
      return false;

    }).value()};
  }
  static addData(params)
  {
    Model.db.get('news').push(Object.assign({id:shortid.generate()},params)).write();
  }
  static editData(params,data)
  {
    Model.db.get('news').find({ id: params.id }).assign(data).write();
  }
  static delData(params)
  {
    Model.db.get('news').remove({ id: params.id }).write();
  }
}
export default Model
