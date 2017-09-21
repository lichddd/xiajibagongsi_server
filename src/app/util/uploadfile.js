import fs from 'fs'
import path from 'path'
import fileutil from './fileutil'
fileutil.mkdirIfNotExist('./uploads/');
class UploadFile{
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
    return {allsize:allsize,list:arr};
  }
  static delUploaded(name)
  {
      fs.unlinkSync(path.resolve('./uploads/',name))
  }
}
export default UploadFile;
