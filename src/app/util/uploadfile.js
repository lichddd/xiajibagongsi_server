import fs from 'fs'
import path from 'path'
class UploadFile{
  static upload(file)
  {
    try{
      fs.statSync(path.join(__dirname,'../../../uploads/'));
    }
    catch(e)
    {
      fs.mkdirSync(path.join(__dirname,'../../../uploads/'));
    }



    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join(__dirname,'../../../uploads/', Math.random().toString()));
    reader.pipe(stream);
  }
  static getUploads()
  {

    let dir = fs.readdirSync(path.join(__dirname,'../../../uploads/'));
    let arr=[];
    let allsize=0;
    dir.forEach((f)=>{
      let s=fs.statSync(path.join(__dirname,'../../../uploads/',f))
      arr.push(Object.assign({name:f},s));
      allsize+=s.size;
    });
    return {allsize:allsize,list:arr};
  }
  static delUploaded(name)
  {
      fs.unlinkSync(path.join(__dirname,'../../../uploads/',name))
  }
}
export default UploadFile;
