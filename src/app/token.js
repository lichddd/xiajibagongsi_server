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
              await next();
          } else {
              // ctx.cookies.set("token", "token");
              throw "傻逼，你没登录";
          }
        }
        else
        {
            await next();
        }

    }

}
export default Token;
