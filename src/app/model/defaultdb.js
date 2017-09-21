import fileutil from '../util/fileutil'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'


fileutil.mkdirIfNotExist('./db/');

let user = low(new FileSync('db/user.json'));
user.defaults({users:[{user:"admin",password:"25f9e794323b453885f5181f1b624d0b"}]}).write();

let news = low(new FileSync('db/news.json'));
news.defaults({news:[]}).write();
