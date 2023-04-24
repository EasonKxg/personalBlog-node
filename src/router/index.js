const fs = require("fs");
const path = require("path");

// 批量注册
const useRouter = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js") return;
    const filePath = path.join(__dirname, file, "index.js");
    const fileRouter = require(filePath);
    app.use(fileRouter.routes());
    app.use(fileRouter.allowedMethods());
  });
};

module.exports = useRouter;
