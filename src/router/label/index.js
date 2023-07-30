const KoaRouter = require("koa-router");
const LabelController = require("../../controller/label/label-controller");
const { VerifyUserAuth } = require("../../middleware/auth/auth-middleware");
const LabelRouter = new KoaRouter({ prefix: "/label" });

// 获取所有的标签
LabelRouter.get("/list", VerifyUserAuth, LabelController.labelList);
// 新建
LabelRouter.post("/insert", VerifyUserAuth, LabelController.labelInsert);
// 编辑
LabelRouter.patch("/update", VerifyUserAuth, LabelController.labelUpdate);
// 删除
LabelRouter.delete("/delete", VerifyUserAuth, LabelController.labelDelete);

module.exports = LabelRouter;
