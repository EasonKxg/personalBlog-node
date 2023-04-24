const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const useRouter = require("../router/index");
const errorHandler = require("../app/error-handler");

const app = new Koa();

app.use(bodyparser()); // 解析 body
useRouter(app); // 统一注册路由
app.on("error", errorHandler); // 监听错误

module.exports = app;
