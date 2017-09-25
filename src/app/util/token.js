import crypto from 'crypto'
import model from '../model'
import language from '../language'

class Token {
    static tokenUris=["admin"];
    static async token(ctx, next)
    {
        let arr=ctx.url.split("/");
        let uri="";
        if (arr.length>1) {
          uri=arr[1];
        }
        if (Token.tokenUris.includes(uri)) {
          if (ctx.cookies.get("token")) {
              let t=model.user.getToken(ctx.cookies.get("token"));
              if (t&&t.tokendate&&t.tokendate>(new Date()).getTime()) {
                await next();
              }
              else{
                ctx.body={code:9999};
                throw "登录过期";
              }

          } else {
              throw language.language(ctx).errors.no_token;
          }
        }
        else
        {
            await next();
        }

    }
    static createToken(user)
    {
      return crypto.createHash('md5').update(user).digest('hex');
    }
}
export default Token;
