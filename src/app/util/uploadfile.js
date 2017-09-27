import fs from 'fs'
import path from 'path'

class UploadFile{
  static maxsize=1024*1024*1024
  static upload(file)
  {
    const reader = fs.createReadStream(file.path);
    let newname=Math.random().toString();
    const stream = fs.createWriteStream(path.resolve('./uploads/', newname));
    reader.pipe(stream);
    return newname;
  }
  static getUploads()
  {

    let dir = fs.readdirSync(path.resolve('./uploads/'));
    let arr=[];
    let allsize=0;
    dir.forEach((f)=>{
      let s=fs.statSync(path.resolve('./uploads/',f))
      arr.push(Object.assign({name:f},s));
      allsize+=s.size;
    });
    return {allsize:allsize,maxsize:UploadFile.maxsize,list:arr};
  }
  static delUploaded(name)
  {
      fs.unlinkSync(path.resolve('./uploads/',name))
  }
  static info()
  {
    let dir = fs.readdirSync(path.resolve('./uploads/'));
    let arr=[];
    let allsize=0;
    let dbsize=0;
    let filecount=0;
    dir.forEach((f)=>{
      let s=fs.statSync(path.resolve('./uploads/',f))
      arr.push(Object.assign({name:f},s));
      allsize+=s.size;
      filecount+=1;
    });
    dir = fs.readdirSync(path.resolve('./db/'));
    dir.forEach((f)=>{
      let s=fs.statSync(path.resolve('./db/',f))
      arr.push(Object.assign({name:f},s));
      dbsize+=s.size;
    });
    return {allsize:allsize,dbsize:dbsize,filecount:filecount,maxsize:UploadFile.maxsize};
  }
}
export default UploadFile;
