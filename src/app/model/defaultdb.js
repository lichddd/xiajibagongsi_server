import fileutil from '../util/fileutil'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import conf from '../conf'

class Model {
  static db_path=`${conf.pre_path}db/`
}
fileutil.mkdirIfNotExist(Model.db_path);

low(new FileSync(`${Model.db_path}user.json`)).defaults({users:[{user:"admin",password:"25f9e794323b453885f5181f1b624d0b"}]}).write();

low(new FileSync(`${Model.db_path}news.json`)).defaults({news:[]}).write();

low(new FileSync(`${Model.db_path}visit.json`)).defaults({visit:[],allcount:0}).write();


export default Model
