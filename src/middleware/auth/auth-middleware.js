const jwt = require("jsonwebtoken");
const UserService = require("@/service/user/user-service");
const errorTypes = require("@/global/error-types");
const { PUBLIC_KEY } = require("@/global/config");

// 验证用户的 tokn
const VerifyUserAuth = async (cxt, next) => {
  try {
    // 获取令牌
    const authorization = cxt.header.authorization;
    if (!authorization) {
      const error = new Error(errorTypes.NO_AUTHORIZATION);
      cxt.app.emit("error", error, cxt);
      return;
    }
    const token = authorization.replace("Bearer ", "");
    const user = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    cxt.user = user;
    await next();
  } catch (error) {
    if (error.message === "jwt expired") {
      const error = new Error(errorTypes.EXPIRE_TOKEN);
      cxt.app.emit("error", error, cxt);
      return;
    }
    console.log(error);
    console.log("验证用户的", "VerifyUserAuth");
  }
};

// 验证当前用户是否是管理员
const VerifyUserIsAdmin = async (cxt, next) => {
  try {
    const { name } = cxt.user;
    const [userInfo] = await UserService.getUserByName(name);
    if (!userInfo.isAdmin) {
      const error = new Error(errorTypes.NOT_PERMISSION);
      cxt.app.emit("error", error, cxt);
      return;
    }
    await next();
  } catch (error) {
    console.log(error, "VerifyUserIsAdmin");
  }
};
module.exports = { VerifyUserAuth, VerifyUserIsAdmin };
