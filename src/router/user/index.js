const KoaRouter = require("koa-router");
const UserRouter = new KoaRouter({ prefix: "/user" });
const {
  VerifyUser,
  handlePasswored,
  VerifyLoginAuth,
  VerifyUserIsExist,
} = require("@/middleware/user/user-middleware");
const {
  VerifyUserAuth,
  VerifyUserIsAdmin,
} = require("@/middleware/auth/auth-middleware");
const UserController = require("@/controller/user/user-controller");

// 获取所有的用户
UserRouter.get("/list", VerifyUserAuth, UserController.getAllUserList);
// 注册
UserRouter.post(
  "/register",
  VerifyUser,
  handlePasswored,
  UserController.inster
);
// 登录
UserRouter.post("/doLogin", VerifyLoginAuth, UserController.doLogin);

// 更新用户
UserRouter.patch("/update", VerifyUserAuth, UserController.updateUser);
// 删除用户
UserRouter.delete(
  "/delete/:userName",
  VerifyUserAuth,
  VerifyUserIsExist,
  VerifyUserIsAdmin,
  UserController.deleteUser
);

// 禁用用户登录

module.exports = UserRouter;
