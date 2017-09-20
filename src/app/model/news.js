import http from 'http'
import low from 'lowdb'
import path from 'path'
import fs from 'fs'
import FileSync from 'lowdb/adapters/FileSync'
import shortid from 'shortid'

try{
  fs.statSync(path.resolve('./db/'));
}
catch(e)
{
  fs.mkdirSync(path.resolve('./db/'));
}
const adapter = new FileSync('db/news.json')
const db = low(adapter)

const url=`http://news-at.zhihu.com/api/4/`;
class Model {
  static getData(params)
  {
    return {news:db.get('news').filter((n)=>{
      if (n.title.search(params.keyword)>=0) {
        return true;
      }
      return false;

    }).value()};
  }
  static addData(params)
  {
    db.get('news').push(Object.assign({id:shortid.generate()},params)).write();
  }
  static editData(params,data)
  {
    db.get('news').find({ id: params.id }).assign(data).write();
  }
  static delData(params)
  {
    db.get('news').remove({ id: params.id }).write();
  }
}
export default Model
