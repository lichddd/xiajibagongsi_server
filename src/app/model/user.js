import crypto from 'crypto'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import shortid from 'shortid'

class Model {
  static db = low(new FileSync('db/user.json'))
  static login(user,password)
  {
    let u=Model.db.get('users').find({user:user}).value();
    if (u&&u.password==password) {
      return true;
    }
    return false;
  }
}
export default Model
