// console.log(process.env.NODE_ENV);


import '../src/app/plugin/Math'
import '../src/app/plugin/Date'



test('Date', () => {
    expect((() => {
        let d = new Date();
        d.setFullYear(1000);
        d.setMonth(9);
        d.setDate(10)
        return d.Format("YYYY-MM-DD");
    })()).toBe("1000-10-10");

    expect((() => {
        let d = new Date();
        d.setFullYear(1);
        d.setMonth(1);
        d.setDate(1)
        return d.Format("YYYY-MM-DD");
    })()).toBe("1-02-01");
    expect((() => {
        let d = new Date();
        d.setFullYear(2001);
        d.setMonth(1);
        d.setDate(1)
        return d.Format("YY-MM-DD");
    })()).toBe("01-02-01");
    expect((() => {
        let d = new Date();
        d.setFullYear(2017);
        d.setMonth(1);
        d.setDate(1)
        return d.Format("YY-MM-DD");
    })()).toBe("17-02-01");

});

test('bigOrSmall', () => {
    expect([
        {
            i: 3
        }, {
            i: 2
        }, {
            i: 1
        }
    ].sort(Math.bigOrSmall('i'))).toEqual([
        {
            i: 1
        }, {
            i: 2
        }, {
            i: 3
        }
    ]);
});
// test('Failed to create a todo if not give the params', async () => {
//   const response = await request(server)
//             .post('/api/todolist')
//             .set('Authorization', 'Bearer ' + token)  不发送创建的参数
//   expect(response.status).toBe(500)  服务端报500错误
// })
