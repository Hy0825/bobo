// 引入编写好的api
const api = require('./api') 
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const express = require('express')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', api);
// 监听8090端口
app.listen(8090)
console.log('启动成功 8090端口')
