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
    allows:[1,2,3,4,5,6,7,8,9,1111],
    notallows:[0,11,12,13,14,1],
  }










}
