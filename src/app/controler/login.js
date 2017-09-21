import model from '../model'

class Login{
  static async login(ctx)
  {
      if (model.user.login(ctx.request.body.user,ctx.request.body.password)) {
        ctx.cookies.set("token", "token",{
          // domain: 'localhost',  // 写cookie所在的域名
          // path: '/index',       // 写cookie所在的路径
          maxAge: 30 * 24 * 60 * 60 * 1000, // cookie有效时长
          // expires: new Date('2018-11-15'),  // cookie失效时间
          httpOnly: false,  // 是否只用于http请求中获取
          // overwrite: false  // 是否允许重写
          'Access-Control-Allow-Credentials':true
        });
      }
      else
      {
        throw "用户名密码不正确";
      }

  }
}
export default Login;
