var sql = require('./db')
const NAME = 'admin'
const PASSWORD = 'admin'
var dbInit = function () {
  sql.connect(function (err) {
    if (err) {
      console.log('数据库连接失败')
    }else {
      console.log('成功连接数据库,正在初始化数据库')
      creatSheet(sql)
      sql.end()
    }
  })
}
var creatSheet = function (sql) {
  sql.query('CREATE TABLE clothes(id smallint(6) unsigned NOT NULL auto_increment,name varchar(255),code varchar(255),price varchar(255),size1 varchar(255),size3 varchar(255),size5 varchar(255),size7 varchar(255),size9 varchar(255),PRIMARY KEY (`id`)) ENGINE=MyISAM DEFAULT CHARSET=utf8', function (err) {
    !err ? console.log('商品表创建成功') : console.log(err)
  })
  sql.query('CREATE TABLE member(id smallint(6) unsigned NOT NULL auto_increment,name varchar(255),phone varchar(255),integral varchar(255),PRIMARY KEY (`id`) ) ENGINE=MyISAM DEFAULT CHARSET=utf8', function (err) {
    !err ? console.log('会员表创建成功') : console.log(err)
  })
  sql.query('CREATE TABLE manager(id smallint(6) unsigned NOT NULL auto_increment,name varchar(255),phone varchar(255),adress varchar(255),idcard varchar(255),loginname varchar(255),password varchar(255),PRIMARY KEY (`id`)) ENGINE=MyISAM DEFAULT CHARSET=utf8', function (err) {
    !err ? console.log('管理员表创建成功') : console.log(err)
  })
  sql.query('insert into manager set ?', {id:0,name: '管理员',loginname: NAME,password: PASSWORD}, function (err) {
    !err ? console.log('管理员表初始化成功') : console.log(err)
  })
}
dbInit()
