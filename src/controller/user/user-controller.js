const jwt = require("jsonwebtoken");
const UserService = require("@/service/user/user-service");
const errorTypes = require("@/global/error-types");
const { reqSuccess, delSuccess } = require("../../global/success-types");
const { PRIVATE_KEY } = require("@/global/config");

class UserController {
  // 注册
  async inster(cxt, next) {
    try {
      const { name, password } = cxt.request.body;
      await UserService.inster(name, password);
      cxt.body = reqSuccess;
    } catch (err) {
      console.log(err, "UserController");
    }
  }
  // 登录
  async doLogin(cxt, next) {
    try {
      const { id, name } = cxt.request.body;

      /**
       * 生成token
       * id, name 数据
       * PRIVATE_KEY :私钥
       * expiresIn：过期时间
       * algorithm：加密算法
       */
      const token = jwt.sign({ id, name }, PRIVATE_KEY, {
        expiresIn: 60 * 60 * 24 * 14,
        algorithm: "RS256",
      });
      console.log(token, "token");
      cxt.body = {
        code: 200,
        msg: "登录成功",
        data: {
          id,
          name,
          token,
        },
      };
    } catch (error) {
      console.log(error, "UserController");
    }
  }
  // 删除用户
  async deleteUser(cxt, next) {
    try {
      const { name } = cxt.user;
      const { userName } = cxt.request.params;
      // 判断用户是否存在
      const [userInfo] = await UserService.getUserByName(userName);
      if (!userInfo) {
        const error = new Error(errorTypes.NAME_IS_NOT_EXISTS);
        cxt.app.emit("error", error, cxt);
        return;
      }
      // 不能删除自己
      if (name === userName) {
        const error = new Error(errorTypes.INVALID_OPERATION);
        cxt.app.emit("error", error, cxt);
        return;
      }
      // 删除
      const result = await UserService.deleteUserById(userInfo.id);
      if (result) {
        cxt.body = delSuccess;
      }
    } catch (err) {
      console.log(err, "UserController");
    }
  }
  // 更新用户
  async updateUser(cxt, next) {
    try {
      const { id } = cxt.user;
      const { name } = cxt.request.body;
      if (!name) {
        const error = new Error(errorTypes.INCORRECT_PARAMETER);
        cxt.app.emit("error", error, cxt);
        return;
      }
      const [userInfo] = await UserService.getUserByName(name);
      if (userInfo) {
        const error = new Error(errorTypes.NAME_IS_EXISTS);
        cxt.app.emit("error", error, cxt);
        return;
      }
      await UserService.updateUserById(name, id);
      cxt.body = reqSuccess;
    } catch (error) {
      console.log(error, "UserController");
    }
  }

  // 获取所有的用户
  async getAllUserList(cxt, next) {
    try {
      const data = await UserService.getAllUser();
      cxt.body = {
        code: 200,
        data: data,
        msg: "请求成功  ",
      };
    } catch (error) {
      console.log(error, "UserController");
    }
  }
}

module.exports = new UserController();
