import http from 'http'
import low from 'lowdb'
import path from 'path'
import fs from 'fs'
import FileSync from 'lowdb/adapters/FileSync'

try{
  fs.statSync(path.resolve('./db/'));
}
catch(e)
{
  fs.mkdirSync(path.resolve('./db/'));
}
const adapter = new FileSync('db/main.json')
const db = low(adapter)
const newsjson = new FileSync('db/news.json')
const newsdb = low(newsjson)
newsdb.defaults({ news: []}).write()
// db.defaults({ posts: [], user: {} })
//   .write()

// db.get('posts')
//   .push({ id: 1, title: 'lowdb is awesome'})
//   .write();
//
// db.set('user.name', 'typicode')
//   .write();
const url=`http://news-at.zhihu.com/api/4/`;
class Model {
  static getData(uri)
  {
    let d=null;
    try {
      d= db.get(uri).value();
      if (!d) {
          d=new Promise((resolve, reject) => {
          http.get(url + uri, (res) => {
              let body = "";
              res.on("data", (data) => {
                  body += data;
              }).on("end", async() => {
                  body = JSON.parse(body);
                  db.set(uri,body).write();
                  resolve(body);
              });
          });
        });
      }
    } catch (e) {
      console.log(e);
      d=e;
    } finally {
      return d;
    }
    return d;
  }
}
export default Model
