const TIMEOUT_TIME = 30000
const DELAY_TIME = 20000
class Message {
    static users={}
    static addMsg(target,source,data,all=false)
    {
      Message.users[target].list.push({target:all?"":target,source:source,data:{text:data,time:(new Date()).Format("YYYY-MM-DD hh:mm")}});
      Message.users[target].lastID += 1;
      if (Message.users[target].callback) {
        Message.users[target].callback({target:all?"":target,source:source,data:{text:data,time:(new Date()).Format("YYYY-MM-DD hh:mm")}});
      }
    }
    static removeUser(name)
    {
      clearTimeout(Message.users[name].delcallback);
      Message.users[name].delcallback=setTimeout(() => {
        Message.users[name]=null;
        delete Message.users[name];
      }, TIMEOUT_TIME);
    }
    static sendMsg(data,target,source)
    {
        if (target) {
          if (!Message.users[target]) {
            throw "目标用户不在线";
          }
          Message.addMsg(target,source,data);
        }
        else{
          for (var variable in Message.users) {
            if (Message.users.hasOwnProperty(variable)) {
              Message.addMsg(variable,source,data,true);
            }
          }
        }
    }
    static async getMsg(myname,lastID)
    {
        if (Message.users[myname]&&lastID) {
            Message.users[myname].currentID=lastID;
        }
        if (!Message.users[myname]) {
          Message.users[myname]={callback:null,name:myname,list:[],currentID:null,lastID:0,delcallback:null};
        }
        if(Message.users[myname].callback)
        {
          Message.users[myname].callback(false);
        }
        let last=Message.users[myname].currentID||0;
        if (last < Message.users[myname].lastID) {
            Message.removeUser(myname);
            return {lastID:Message.users[myname].lastID,list:Message.users[myname].list.slice(last,Message.users[myname].list.length)};
        } else {
            return new Promise((resolve, reject) => {
                    let st=setTimeout(async() => {
                      Message.users[myname].callback=null;
                      Message.removeUser(myname);
                      resolve({lastID:Message.users[myname].lastID,list:[]});
                    }, DELAY_TIME);
                    Message.users[myname].callback=(data)=>{
                      clearTimeout(st);
                      Message.users[myname].callback=null;
                      Message.removeUser(myname);
                      if (data) {
                        resolve({lastID:Message.users[myname].lastID,list:[data]});
                      } else {
                        resolve({lastID:null,list:null});
                      }
                    };
                });
        }
    }
}
export default Message;
