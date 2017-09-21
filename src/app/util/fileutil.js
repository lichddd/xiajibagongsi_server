import fs from 'fs'
import path from 'path'
class FileUtil{
  static mkdirIfNotExist(dir)
  {
    try{
      fs.statSync(path.resolve(dir));
    }
    catch(e)
    {
      fs.mkdirSync(path.resolve(dir));
    }
  }

}
export default FileUtil;
