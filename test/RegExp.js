export default {
  name:{
    pattern:/^[a-z]{1}[a-zA-Z0-9]{0,29}/,
    desc:"name的正则表达式,小写字母开头,字母数字30位以内",
    allows:["aaa","aJKHJGY","/*-/-/*-/*"],
    notallows:["*/-/*-/-*/","231321321","afewfewf"],
  },
  number:{
    validator:(vue)=>{
      return (rule,value,callback)=>{
      if(value>0&&value<10)
      {
        callback();
        return ;
      }
      callback("error");
    }},
    desc:"number的正则表达式,1-9",
    allows:[{vue:null,value:1},{vue:null,value:2},{vue:null,value:3},{vue:null,value:1111}],
    notallows:[{vue:null,value:0},{vue:null,value:11},{vue:null,value:12},{vue:null,value:1}],
  }










}
