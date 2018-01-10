import fs from 'fs'
import path from 'path'
import jimp from 'jimp'

class UploadFile{
  static maxsize=1024*1024*1024
  static async upload(file)
  {
    return new Promise((resolve,reject)=>{

      try {
        const reader = fs.createReadStream(file.path);
        let newname=(new Date()).getTime().toString()+Math.random().toString()+'.png';
        const stream = fs.createWriteStream(path.resolve('./uploads/', newname));
        reader.pipe(stream);
        reader.on('end',()=>{

          jimp.read(path.resolve('./uploads/', newname)).then(function (lenna) {
              lenna.resize(200, 200)            // resize
                   .quality(40)                 // set JPEG quality
                   .write(path.resolve('./uploads/small/', newname)); // save
              resolve(newname);
          }).catch(function (err) {
              reject(err);
          });
        });
      } catch (e) {
        reject(e);
      }






    })

  }
  static getUploads()
  {

    let dir = fs.readdirSync(path.resolve('./uploads/'));
    let arr=[];
    let allsize=0;
    dir.forEach((f)=>{
      if (f=='small') {
        return;
      }
      let s=fs.statSync(path.resolve('./uploads/',f))
      arr.push(Object.assign({name:`small/${f}`,href:f},s));
      allsize+=s.size;
    });
    return {allsize:allsize,maxsize:UploadFile.maxsize,list:arr};
  }
  static delUploaded(name)
  {
      fs.unlinkSync(path.resolve('./uploads/',name));
      fs.unlinkSync(path.resolve('./uploads/small/',name));
  }
  static info()
  {
    let dir = fs.readdirSync(path.resolve('./uploads/'));
    let arr=[];
    let allsize=0;
    let dbsize=0;
    let filecount=0;
    dir.forEach((f)=>{
      if (f=='small') {
        return;
      }
      let s=fs.statSync(path.resolve('./uploads/',f))
      arr.push(Object.assign({name:f},s));
      allsize+=s.size;
      filecount+=1;
    });
    dir = fs.readdirSync(path.resolve('./uploads/small/'));
    dir.forEach((f)=>{
      let s=fs.statSync(path.resolve('./uploads/small',f))
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
