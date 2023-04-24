require("module-alias/register"); // 设置路径别名
const app = require("./app/index");
const { APP_PORT } = require("./global/config");

app.listen(APP_PORT, () => {
  console.log(`端口${APP_PORT}已启动`);
});
