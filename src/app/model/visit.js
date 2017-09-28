import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

class Model {
  static db = low(new FileSync('db/visit.json'))
  static visit()
  {
    Model.db.set('allcount',Model.db.get('allcount').value()+1).write();
    let date=(new Date()).Format("YYYY-MM-DD");
    let now=Model.db.get('visit').find({ date:date});
    if(now.value())
    {
      now.assign({count:now.value().count+1}).write();
    }
    else
    {
      Model.db.get('visit').push({ date:date,count:1}).write();
    }

  }
  static getData()
  {
      return Model.db.value();
  }
}
export default Model
