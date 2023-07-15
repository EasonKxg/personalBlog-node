const errorTypes = require("@/global/error-types");
const UserService = require("@/service/user/user-service");
const { md5Password } = require("@/utils/password-handlre");

// 验证用户
const VerifyUser = async (cxt, next) => {
  try {
    // 判断用户名长度
    const { name, password } = cxt.request.body;
    if (!name || !password) {
      const error = new Error(errorTypes.PARAMETER_IS_NULL);
      cxt.app.emit("error", error, cxt);
      return;
    }
    if (name.length > 8) {
      const error = new Error(errorTypes.INCORRECT_PARAMETER);
      cxt.app.emit("error", error, cxt);
      return;
    }
    // 判断用户是否存在
    const userInfo = await UserService.getUserByName(name);
    if (userInfo.length) {
      const error = new Error(errorTypes.NAME_IS_EXISTS);
      cxt.app.emit("error", error, cxt);
      return;
    }
    await next();
  } catch (error) {
    console.log(error, "VerifyUser");
  }
};

// 验证登录
const VerifyLoginAuth = async (cxt, next) => {
  try {
    // 判断输入是否合法
    const { name, password } = cxt.request.body;
    if (!name || !password) {
      const error = new Error(errorTypes.PARAMETER_IS_NULL);
      console.log(cxt, "cxt");
      cxt.app.emit("error", error, cxt);
      return;
    }
    // 判断用户是否存在
    const [userInfo] = await UserService.getUserByName(name);
    if (!userInfo) {
      const error = new Error(errorTypes.PRE_REGISTRATION);
      cxt.app.emit("error", error, cxt);
      return;
    }
    // 判断密码是否一致
    const encryptPassword = md5Password(password);
    if (encryptPassword !== userInfo.password) {
      const error = new Error(errorTypes.ACCOUNT_PASSWORD_IS_INCORRENT);
      cxt.app.emit("error", error, cxt);
      return;
    }
    cxt.request.body["id"] = userInfo.id;
    await next();
  } catch (error) {
    console.log(error, "VerifyLoginAuth");
  }
};

// 加密密码
const handlePasswored = async (cxt, next) => {
  const { password } = cxt.request.body;
  cxt.request.body.password = md5Password(password);

  await next();
};

// 判断用户是否存在
const VerifyUserIsExist = async (cxt, next) => {
  const { userName } = cxt.request.params;
  const [userInfo] = await UserService.getUserByName(userName);
  if (!userInfo) {
    const error = new Error(errorTypes.NAME_IS_NOT_EXISTS);
    cxt.app.emit("error", error, cxt);
    return;
  }
  await next();
};
module.exports = {
  VerifyUser,
  handlePasswored,
  VerifyLoginAuth,
  VerifyUserIsExist,
};
