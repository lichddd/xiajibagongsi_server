class Message {
    static users={}
    static sendMsg(data,target,source)
    {

        if (target) {
          if (!Message.users[target]) {
            throw "目标用户不在线";
          }
          Message.users[target].list.push({target:target,source:source,data:data});
          Message.users[target].lastID += 1;
          if (Message.users[target].callback) {
            Message.users[target].callback({target:target,source:source,data:data});
          }
        }
        else{
          for (var variable in Message.users) {
            if (Message.users.hasOwnProperty(variable)) {
              Message.users[variable].list.push({target:"",source:source,data:data});
              Message.users[variable].lastID += 1;
              if (Message.users[variable].callback) {
                Message.users[variable].callback({target:"",source:source,data:data});
              }
            }
          }
        }
    }
    static async getMsg(last,myname)
    {
        if (!Message.users[myname]) {
          Message.users[myname]={callback:null,name:myname,list:[],lastID:0,delcallback:null};
        }
        if (last < Message.users[myname].lastID) {
            clearTimeout(Message.users[myname].delcallback);
            Message.users[myname].delcallback=setTimeout(() => {
              Message.users[myname]=null;
              delete Message.users[myname];
            }, 30000);
            return Message.users[myname].list.slice(last,Message.users[myname].list.length);
        } else {
            return new Promise((resolve, reject) => {
                    let st=setTimeout(async() => {
                      Message.users[myname].callback=null;
                      clearTimeout(Message.users[myname].delcallback);
                      Message.users[myname].delcallback=setTimeout(() => {
                        Message.users[myname]=null;
                        delete Message.users[myname];
                      }, 30000);
                        resolve([]);
                    }, 20000);
                    Message.users[myname].callback=(data)=>{
                      clearTimeout(st);
                      Message.users[myname].callback=null;
                      clearTimeout(Message.users[myname].delcallback);
                      Message.users[myname].delcallback=setTimeout(() => {
                        Message.users[myname]=null;
                        delete Message.users[myname];
                      }, 30000);
                        resolve([data]);
                    };
                });
        }
    }
}
export default Message;
