// 错误处理
const errorTypes = require("../global/error-types");

const errorHandler = (error, cxt) => {
  let status = 500;
  let message = {
    code: status,
    msg: "服务器错误",
  };
  switch (error.message) {
    case errorTypes.NAME_IS_EXISTS:
      status = 409;
      message = {
        code: status,
        msg: "账号已存在",
      };
      break;
    case errorTypes.NAME_IS_NOT_EXISTS:
      status = 400;
      message = {
        code: status,
        msg: "账号不存在",
      };
      break;
    case errorTypes.INCORRECT_PARAMETER:
      status = 400;
      message = {
        code: status,
        msg: "参数不正确",
      };
      break;
    case errorTypes.PARAMETER_IS_NULL:
      status = 400;
      message = {
        code: status,
        msg: "参数不能为空",
      };
      break;
    case errorTypes.PRE_REGISTRATION:
      status = 400;
      message = {
        code: status,
        msg: "账号未注册",
      };
      break;
    case errorTypes.ACCOUNT_PASSWORD_IS_INCORRENT:
      status = 400;
      message = {
        code: status,
        msg: "账号或者密码错误",
      };
      break;
    case errorTypes.NO_AUTHORIZATION:
      status = 403;
      message = {
        code: status,
        msg: "登录已失效",
      };
      break;
    case errorTypes.NOT_PERMISSION:
      status = 403;
      message = {
        code: status,
        msg: "暂无权限操作",
      };
      break;
    case errorTypes.INVALID_OPERATION:
      status = 403;
      message = {
        code: status,
        msg: "无效操作",
      };
      break;
    case errorTypes.NO_DATA:
      status = 403;
      message = {
        code: status,
        msg: "暂无数据",
      };
      break;
    case errorTypes.DATA_IS_EXISTS:
      status = 403;
      message = {
        code: status,
        msg: "数据已存在",
      };
      break;
    case errorTypes.EXPIRE_TOKEN:
      status = 401;
      message = {
        code: status,
        msg: "token已过期",
      };
      break;
    default:
      status = 500;
      message = {
        code: status,
        msg: "服务器错误",
      };
      break;
  }
  cxt.status = status;
  cxt.body = message;
  console.log(cxt.body);
};

module.exports = errorHandler;
