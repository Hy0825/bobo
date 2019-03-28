var mysql = require('mysql')
var dbData,sql
sql = mysql.createConnection({
  "host": "localhost",
  "user": "root",
  "password": "root",
  "database": "bobo",
  "port":"3306"
})
module.exports = sql
