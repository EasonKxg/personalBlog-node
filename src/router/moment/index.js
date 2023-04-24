const KoaRouter = require("koa-router");
const MomentRouter = new KoaRouter({ prefix: "/moment" });
const MomentController = require("@/controller/moment/moment-controller");
const { VerifyUserAuth } = require("@/middleware/auth/auth-middleware");

// 发表
MomentRouter.post("/insert", VerifyUserAuth, MomentController.insertMoment);
// 更新
MomentRouter.patch("/update", VerifyUserAuth, MomentController.updateMoment);
// 删除
MomentRouter.delete("/delete", VerifyUserAuth, MomentController.deleteMoment);
module.exports = MomentRouter;
