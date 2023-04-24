// 加密密码
const crypto = require("crypto");

const md5Password = (password) => {
  const md5 = crypto.createHash("md5"); // 选择 md5 加密方式
  return md5.update(password).digest("hex"); // hex 选择返回进制
};

module.exports = { md5Password };
