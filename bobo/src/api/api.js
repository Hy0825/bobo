const models = require('./db')
const express = require('express')
var sql = require('./db')
const router = express.Router()
/****
 * 登录
 */
router.post('/login', function (req, res) {
  // console.log(req.body)
  sql.query('select * from manager where loginname = "' + req.body.loginname + '"', function (err, ret) {
    if (err) {
      // console.log(err)
      res.send({status: 0,msg:'登录失败'})
    }else {
      var data = []
      if (ret.length === 0) {
        res.send({status: -1,msg:'用户名不存在'})
      } else {
        // console.log(req.body.password)
        // console.log("-----")
        // console.log(ret[0].password)
        // console.log("-----")
        // console.log(ret)
        if (req.body.password === ret[0].password) {
          res.send({status: 1,msg:'登录成功',data:ret[0]})
        } else {
          res.send({status: -1,msg:'用户名或密码错误'})
        }
      }
    }
  })
})
/****
 * 新增商品
 */
router.post('/clothes/add', function(req, res){
  // console.log(req.body)
  sql.query('insert into clothes set ?', req.body, function (err) {
    if (!err){
      res.send({status: 1,msg:'添加成功'})
    } else {
      res.send({status: -1,msg:'添加失败'})
    }
  })
})
/****
 * 列表分页数据
 */
router.post('/clothes/list', function(req, res){
  var sqlurl = 'select * from clothes'
  var data = {}
  sql.query(sqlurl, req.body, function (err, ret) {
    if (!err){
      data.total = ret.length
    } else {
      data.total = 0
    }
  })
  var sqlurl1 = 'select * from clothes ORDER BY code limit '+ req.body.index +','+ req.body.size
  sql.query(sqlurl1, function (err, ret) {
    if (!err){
      data.list = []
      data.list.push(ret)
      res.send({status: 1,msg:'查询成功', data: data})
    } else {
      // console.log(err)
      data.list = []
      res.send({status: -1,msg:'查询失败', data: data})
    }
  })
})
/****
 * 删除商品
 */
router.post('/clothes/remove', function(req, res){
  var sqlurl = 'DELETE FROM clothes WHERE id = ' + req.body.id
  var data = {}
  sql.query(sqlurl,function (err, ret) {
    if (!err){
      res.send({status: 1,msg:'删除成功'})
    } else {
      res.send({status: -1,msg:'删除失败'})
    }
  })
})
/**
 * 更新数据
 */
router.post('/clothes/updata', function(req, res){
  var id = req.body.id;
  var name = req.body.name;
  var code = req.body.code;
  var price = req.body.price;
  var size1 = req.body.size1;
  var size3 = req.body.size3;
  var size5 = req.body.size5;
  var size7 = req.body.size7;
  var size9 = req.body.size9;
  var sqlurl = ` update clothes set name = \'${name}\',code = \'${code}\',price = \'${price}\',size1 = \'${ size1 }\',size3 = \'${size3}\',size5 = \'${size5}\',size7 = \'${size7}\',size9 = \'${size9}\' where id = \'${id} \'` ;
  // console.log(sqlurl)
  sql.query(sqlurl, function (err, ret) {
    if (!err){
      // console.log(ret)
      res.send({status: 1,msg:'修改成功'})
    } else {
      // console.log(err)
      res.send({status: -1,msg:'修改失败'})
    }
  })
})
/****
 * 通过code 查询
 */
router.post('/clothes/search', function(req, res){
  var sqlurl = 'select * from clothes where code = ' + req.body.code
  var data = {}
  sql.query(sqlurl, req.body, function (err, ret) {
    if (!err){
      data.total = ret.length
      data.list = []
      data.list.push(ret)
      res.send({status: 1,msg:'查询成功', data: data})
    } else {
      // console.log(err)
      data.total = 0
      data.list = []
      res.send({status: -1,msg:'查询失败', data: data})
    }
  })
})
/****
 * 商品出库
 */
router.post('/clothes/outgoing', function(req, res){
  var sqlurl = 'select * from clothes where code = ' + req.body.code
  sql.query(sqlurl, function (err, ret) {
    if (!err){
      // console.log(ret)
      var data = ret[0]
      var count = Number(data['size' + req.body.size])
      var newcount = count - Number(req.body.count)
      // console.log(count)
      // console.log(Number(data['size' + req.body.size]))
      // console.log(newcount)
      var sqlurl1 = `update clothes set size${req.body.size} = \'${newcount}\' where code = \'${req.body.code}\'`;
      sql.query(sqlurl1, function (err, ret) {
        if (!err){
          res.send({status: 1,msg:'操作成功'})
        } else {
          // console.log(err)
          res.send({status: -1,msg:'操作失败'})
        }
      })
    } else {
      // console.log(err)
      res.send({status: -1,msg:'请求错误，请重新登录后再试'})
    }
  })
})
///////////////////////////////////////////////////////////////////////////////////////////////////////
/****
 * 新增会员
 */
router.post('/member/add', function(req, res){
  // console.log(req.body)
  var data = {
    name: req.body.name,
    phone: req.body.phone,
    integral: 0
  }
  sql.query('insert into member set ?', data, function (err) {
    if (!err){
      res.send({status: 1,msg:'添加成功'})
    } else {
      // console.log(err)
      res.send({status: -1,msg:'添加失败'})
    }
  })
})
/****
 * 列表分页数据
 */
router.post('/member/list', function(req, res){
  var sqlurl = 'select * from member'
  var data = {}
  sql.query(sqlurl, req.body, function (err, ret) {
    if (!err){
      data.total = ret.length
    } else {
      data.total = 0
    }
  })
  var sqlurl1 = 'select * from member ORDER BY phone limit '+ req.body.index +','+ req.body.size
  sql.query(sqlurl1, function (err, ret) {
    if (!err){
      data.list = []
      data.list.push(ret)
      res.send({status: 1,msg:'查询成功', data: data})
    } else {
      // console.log(err)
      data.list = []
      res.send({status: -1,msg:'查询失败', data: data})
    }
  })
})
/****
 * 删除商品
 */
router.post('/member/remove', function(req, res){
  var sqlurl = 'DELETE FROM member WHERE id = ' + req.body.id
  var data = {}
  sql.query(sqlurl,function (err, ret) {
    if (!err){
      res.send({status: 1,msg:'删除成功'})
    } else {
      res.send({status: -1,msg:'删除失败'})
    }
  })
})
/**
 * 更新数据
 */
router.post('/member/updata', function(req, res){
  var id = req.body.id;
  var name = req.body.name;
  var phone = req.body.phone;
  var integral = req.body.integral;
  var sqlurl = `update member set name = \'${name}\',phone = \'${phone}\',integral = \'${integral}\' where id = \'${id}\'`;
  sql.query(sqlurl, function (err, ret) {
    if (!err){
      res.send({status: 1,msg:'修改成功'})
    } else {
      // console.log(err)
      res.send({status: -1,msg:'修改失败'})
    }
  })
})
/****
 * 通过phone 查询
 */
router.post('/member/search', function(req, res){
  var sqlurl = 'select * from member where phone = ' + req.body.phone
  var data = {}
  sql.query(sqlurl, req.body, function (err, ret) {
    if (!err){
      data.total = ret.length
      data.list = []
      data.list.push(ret)
      // console.log(ret.length)
      res.send({status: 1,msg:'查询成功', data: data})
    } else {
      // console.log(err)
      data.total = 0
      data.list = []
      res.send({status: -1,msg:'查询失败', data: data})
    }
  })
})
///////////////////////////////////////////////////////////////////////////////////////////////////////
/****
 * 新增员工
 */
router.post('/manager/add', function(req, res){
  // console.log(req.body)
  var data = {
    id: req.body.id,
    name: req.body.name,
    phone: req.body.phone,
    adress: req.body.adress,
    idcard: req.body.idcard,
    loginname: req.body.loginname,
    password: req.body.password
  }
  sql.query('insert into manager set ?', data, function (err) {
    if (!err){
      res.send({status: 1,msg:'添加成功'})
    } else {
      // console.log(err)
      res.send({status: -1,msg:'添加失败'})
    }
  })
})
/****
 * 列表分页数据
 */
router.post('/manager/list', function(req, res){
  var sqlurl = 'select * from manager'
  var data = {}
  sql.query(sqlurl, req.body, function (err, ret) {
    if (!err){
      data.total = ret.length
    } else {
      data.total = 0
    }
  })
  var sqlurl1 = 'select * from manager ORDER BY id limit '+ req.body.index +','+ req.body.size
  sql.query(sqlurl1, function (err, ret) {
    if (!err){
      data.list = []
      data.list.push(ret)
      res.send({status: 1,msg:'查询成功', data: data})
    } else {
      // console.log(err)
      data.list = []
      res.send({status: -1,msg:'查询失败', data: data})
    }
  })
})
/****
 * 删除商品
 */
router.post('/manager/remove', function(req, res){
  var sqlurl = 'DELETE FROM manager WHERE id = ' + req.body.id
  var data = {}
  sql.query(sqlurl,function (err, ret) {
    if (!err){
      res.send({status: 1,msg:'删除成功'})
    } else {
      res.send({status: -1,msg:'删除失败'})
    }
  })
})
/**
 * 更新数据
 */
router.post('/manager/updata', function(req, res){
  var id = req.body.id;
  var name = req.body.name;
  var phone = req.body.phone;
  var adress = req.body.adress;
  var idcard = req.body.idcard;
  var loginname = req.body.loginname;
  var password = req.body.password;
  var sqlurl = `update manager set name = \'${name}\',phone = \'${phone}\',adress = \'${adress}\',idcard= \'${idcard}\',loginname= \'${loginname}\',password= \'${password}\' where id = \'${id}\'`;
  sql.query(sqlurl, function (err, ret) {
    if (!err){
      res.send({status: 1,msg:'修改成功'})
    } else {
      // console.log(err)
      res.send({status: -1,msg:'修改失败'})
    }
  })
})
/****
 * 修改密码
 */
router.post('/updataPassword', function(req, res){
  var sqlurl = 'select * from manager where id = ' + req.body.id
  sql.query(sqlurl, function (err, ret) {
    if (!err){
      // console.log(ret)
      var data = ret[0]
      if (req.body.oldpassword !== data.password) {
        res.send({status: -1,msg:'旧密码不正确'})
      } else {
        var sqlurl1 = `update manager set password = \'${req.body.newpassword}\' where id = \'${req.body.id}\'`;
        sql.query(sqlurl1, function (err, ret) {
          if (!err){
            res.send({status: 1,msg:'修改成功'})
          } else {
            // console.log(err)
            res.send({status: -1,msg:'修改失败'})
          }
        })
      }
    } else {
      // console.log(err)
      res.send({status: -1,msg:'请求错误，请重新登录后再试'})
    }
  })
})
/****
 *积分
 */
router.post('/integral', function(req, res){
  var sqlurl = 'select * from member where id = ' + req.body.id
  sql.query(sqlurl, function (err, ret) {
    if (!err){
      // console.log(ret)
      var data = ret[0]
      var integral = Number(data.integral)
      var newintegral = integral + Number(req.body.integral2)
      // console.log(integral)
      // console.log(Number(req.body.integral2))
      // console.log(newintegral)
      var sqlurl1 = `update member set integral = \'${newintegral}\' where id = \'${req.body.id}\'`;
      sql.query(sqlurl1, function (err, ret) {
        if (!err){
          res.send({status: 1,msg:'积分成功'})
        } else {
          // console.log(err)
          res.send({status: -1,msg:'积分失败'})
        }
      })
    } else {
      // console.log(err)
      res.send({status: -1,msg:'请求错误，请重新登录后再试'})
    }
  })
})
module.exports = router;