import app from '../src'
import request from 'supertest'
import model from '../src/app/model'
import sort from '../src/app/util/sort'

import axios from 'axios'

afterEach(() => {
  app.close() // 当所有测试都跑完了之后，关闭server
})
test('Failed to login if typing Molunerfinn & 1234', async () => { // 注意用了async
  const response = await request(app).get('/admin/fewfewfewfewfew');
  expect(response.body.code).toBe(9999);
})
let cookie="";
test('Failed to login if typing Molunerfinn & 1234', async () => { // 注意用了async
  const response = await request(app).post('/login').send({user:"admin",password:"25f9e794323b453885f5181f1b624d0b"});

  cookie=response.headers['set-cookie'];
  console.log(cookie);
  expect(response.body.code).toBe(0)
})
test('Failed to login if typing Molunerfinn & 1234', async () => { // 注意用了async
  const response = await request(app)
                          .post('/admin/addnews')
                          .set('Cookie', cookie)
                          .send({title:"111",html:"111"});
  expect(response.body.code).toBe(0)
})
let sortcount=0;
test('Failed to login if typing Molunerfinn & 1234', async () => { // 注意用了async
  const response = await request(app).get('/homepage/getTitle');
  // console.log(response.body);
  expect(response.body.code).toBe(0)
  sortcount=response.body.news.sort(Math.bigOrSmall('sort',-1))[0].sort;
})

// test('axios', async () => { // 注意用了async
//   const response = await request('localhost:8081').get('/homepage/getTitle');
//   console.log(response);
//   expect(response.body.code).toBe(0);
// })
test('netx sort', () => {
    expect(sort.next(model.news.db.get('news'))).toBe(sortcount+1);
    expect(sort.next()).toBe(1);
});
