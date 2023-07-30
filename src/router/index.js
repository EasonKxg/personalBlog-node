const fs = require("fs");
const path = require("path");
const cors = require("koa2-cors"); // 解决跨域问题
const isDev = process.env.NODE_ENV === "development";

console.log(isDev);

const useRouter = (app) => {
  // 设置跨域
  app.use(
    cors({
      origin: function (ctx) {
        return isDev ? "http://localhost:3000" : "http://localhost:3000"; // 允许来自指定域名请求, 如果设置为*，前端将获取不到错误的响应头
      },
      exposeHeaders: ["WWW-Authenticate", "Server-Authorization", "x-show-msg"],
      maxAge: 5, //  该字段可选，用来指定本次预检请求的有效期，单位为秒
      credentials: true, // 允许携带用户凭证
      allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // 允许的请求方法
      allowHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "X-Requested-With",
      ], // 允许接收的头部字段
    })
  );

  // 批量注册
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js") return;
    const filePath = path.join(__dirname, file, "index.js");
    const fileRouter = require(filePath);
    app.use(fileRouter.routes());
    app.use(fileRouter.allowedMethods());
  });
};

module.exports = useRouter;
