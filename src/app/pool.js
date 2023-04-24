const mysql = require("mysql2");
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = require("@/global/config");

// 连接连接池
const pool = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});

// 监听数据库连接
pool.getConnection((err, conn) => {
  conn.connect((err) => {
    err ? console.log("连接数据库失败") : console.log("连接数据库成功");
  });
});

module.exports = pool.promise();
