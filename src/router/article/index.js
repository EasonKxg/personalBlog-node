const KoaRouter = require("koa-router");
const articleRouter = new KoaRouter({ prefix: "/article" });
const { VerifyUserAuth } = require("../../middleware/auth/auth-middleware");
const articleController = require("../../controller/article/article-controller");

articleRouter.get("/list", VerifyUserAuth);
articleRouter.post("/insert", VerifyUserAuth, articleController.articleInsert);
articleRouter.patch("/update", VerifyUserAuth);
articleRouter.delete("/delete", VerifyUserAuth);
module.exports = articleRouter;
