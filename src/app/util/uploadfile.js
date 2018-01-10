import fs from 'fs'
import path from 'path'
import jimp from 'jimp'
import fileutil from './fileutil'

class UploadFile{
  static maxsize=1024*1024*1024;
  static pic_resize={width:200,height:200,quality:40};
  static img_path='./uploads/';
  static small_img_path='./uploads/small/';
  static small_prefix='small';
  static pic_write_type='.png';
  static async upload(file)
  {
    return new Promise(async (resolve,reject)=>{
      try {
        const reader = fs.createReadStream(file.path);
        let newname=(new Date()).getTime().toString()+Math.random().toString()+UploadFile.pic_write_type;
        const stream = fs.createWriteStream(path.resolve(UploadFile.img_path, newname));
        reader.pipe(stream);
        reader.on('end',async ()=>{
          try {
            let lenna=await jimp.read(path.resolve(UploadFile.img_path, newname))
            lenna.resize(UploadFile.pic_resize.width, UploadFile.pic_resize.height)            // resize
                     .quality(UploadFile.pic_resize.quality)                 // set JPEG quality
                     .write(path.resolve(UploadFile.small_img_path, newname)); // save
            resolve(newname);
          } catch (e) {
            reject(err);
          }
        });
      } catch (e) {
        reject(e);
      }
    })

  }
  static getUploads()
  {

    let dir = fs.readdirSync(path.resolve(UploadFile.img_path));
    let arr=[];
    let allsize=0;
    dir.forEach((f)=>{
      if (f==UploadFile.small_prefix) {
        return;
      }
      let s=fs.statSync(path.resolve(UploadFile.img_path,f))
      arr.push(Object.assign({name:`${UploadFile.small_prefix}/${f}`,href:f},s));
      allsize+=s.size;
    });
    return {allsize:allsize,maxsize:UploadFile.maxsize,list:arr};
  }
  static delUploaded(name)
  {
      fs.unlinkSync(path.resolve(UploadFile.img_path,name));
      fs.unlinkSync(path.resolve(UploadFile.small_img_path,name));
  }
  static info()
  {
    let dir = fs.readdirSync(path.resolve(UploadFile.img_path));
    let arr=[];
    let allsize=0;
    let dbsize=0;
    let filecount=0;
    dir.forEach((f)=>{
      if (f=='small') {
        return;
      }
      let s=fs.statSync(path.resolve(UploadFile.img_path,f))
      arr.push(Object.assign({name:f},s));
      allsize+=s.size;
      filecount+=1;
    });
    dir = fs.readdirSync(path.resolve(UploadFile.small_img_path));
    dir.forEach((f)=>{
      let s=fs.statSync(path.resolve(UploadFile.small_img_path,f))
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
fileutil.mkdirIfNotExist(UploadFile.img_path);
fileutil.mkdirIfNotExist(UploadFile.small_img_path);

export default UploadFile;
