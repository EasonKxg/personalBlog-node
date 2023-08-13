const KoaRouter = require("koa-router");
const articleRouter = new KoaRouter({ prefix: "/article" });
const { VerifyUserAuth } = require("../../middleware/auth/auth-middleware");
const articleController = require("../../controller/article/article-controller");

articleRouter.get("/list", VerifyUserAuth, articleController.articleList);
articleRouter.post("/insert", VerifyUserAuth, articleController.articleInsert);
articleRouter.patch("/update", VerifyUserAuth, articleController.articleUpdate);
articleRouter.delete(
  "/delete/:articleId",
  VerifyUserAuth,
  articleController.articleDelById
);

module.exports = articleRouter;
