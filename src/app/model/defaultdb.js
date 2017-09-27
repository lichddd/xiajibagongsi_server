import fileutil from '../util/fileutil'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'


fileutil.mkdirIfNotExist('./db/');

low(new FileSync('db/user.json')).defaults({users:[{user:"admin",password:"25f9e794323b453885f5181f1b624d0b"}]}).write();

low(new FileSync('db/news.json')).defaults({news:[]}).write();

low(new FileSync('db/visit.json')).defaults({visit:[],allcount:0}).write();
