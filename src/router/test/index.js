const KoaRouter = require("koa-router");
const TestRouter = new KoaRouter({ prefix: "/test" });
const TestController = require("@/controller/test/text-controller");

TestRouter.get("/", TestController.getData);

module.exports = TestRouter;
