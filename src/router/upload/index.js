const KoaRouter = require("koa-router");
const multer = require("koa-multer");
const UploadRouter = new KoaRouter({ prefix: "/upload" });
const { VerifyUserAuth } = require("../../middleware/auth/auth-middleware");
const UploadController = require("../../controller/upload/upload-controller");

const upload = multer({
  dest: "../images/",
});

UploadRouter.post("/image", upload.single("name"), UploadController.upload);

module.exports = UploadRouter;
