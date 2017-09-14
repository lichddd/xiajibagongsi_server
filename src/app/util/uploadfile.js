import fs from 'fs'
import path from 'path'
class UploadFile{
  static upload(ctx)
  {
    try{
      fs.statSync(path.join(__dirname,'../../../uploads/'));
    }
    catch(e)
    {
      fs.mkdirSync(path.join(__dirname,'../../../uploads/'));
    }


    let file=ctx.request.body.files.file;
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join(__dirname,'../../../uploads/', Math.random().toString()));
    reader.pipe(stream);
  }
  static getUploads(ctx)
  {

    let dir = fs.readdirSync(path.join(__dirname,'../../../../uploads/'));
    let arr=[];
    let allsize=0;
    dir.forEach((f)=>{
      let s=fs.statSync(path.join(__dirname,'../../../uploads/',f))
      arr.push(Object.assign({name:f},s));
      allsize+=s.size;
    });
    ctx.body={allsize:allsize,list:arr};
  }
}
export default UploadFile;
