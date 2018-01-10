import crypto from 'crypto'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import shortid from 'shortid'
import db_conf from './defaultdb'
class Model {
  static db = low(new FileSync(`${db_conf.db_path}user.json`))
  static login(user,password)
  {
    let u=Model.db.get('users').find({user:user}).value();
    if (u&&u.password==password) {
      return true;
    }
    return false;
  }
  static setToken(user,token)
  {
    var _date=new Date();
    _date.setDate(_date.getDate()+30);
    Model.db.get('users').find({user:user}).assign({token:token,tokendate:_date.getTime()}).write();
  }
  static getToken(token)
  {
    return Model.db.get('users').find({token:token}).value();
  }
  static delToken(token)
  {
    return Model.db.get('users').remove({token:token}).write();
  }

}
export default Model
