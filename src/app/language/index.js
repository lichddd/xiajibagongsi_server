import en from "./en"
import zh_CN from "./zh-CN"


export default class Language{
  static en=en
  static zh_CN=zh_CN

  static language(ctx)
  {
      let language= {};
      let lang="";
      if (ctx.cookies.get("language")&&ctx.cookies.get("language").length>0) {
        lang=ctx.cookies.get("language");
      } else {
        lang="zh-CN"
      }
      if (lang=="zh-CN"||lang=="zh-TW") {
        lang="zh-CN";
      }
      if (lang!="zh-CN"&&lang!="en") {
        lang="en";
      }
      return Language[lang.replace("-","_")];
  };
  static getLanguage(code,params){
        let tempstr=code;
        if (params&&params.length>0) {
          for (var i = 0; i < params.length; i++) {
            tempstr = tempstr.replace(new RegExp("@\{p"+i+"}","gi"),params[i]);
          }
        }
        return tempstr;
  }


}
