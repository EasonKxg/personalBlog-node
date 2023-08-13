const qs = require("querystring");
class UploadController {
  async upload(cxt, next) {
    // 0.转二进制
    cxt.req.setEncoding("binary");

    // 1.获取数据
    let body = "";
    const totalBoundary = cxt.req.headers["content-type"].split(";")[1];
    const boundary = totalBoundary.split("=")[1];

    console.log(cxt.req.on, " cxt.req");
    // 2.监听数据
    cxt.req.on("data", (data) => {
      console.log("type");
      body += data;
    });

    // // 3.监听数据的接收
    // cxt.req.on("end", () => {
    //   const payload = qs.parse(body, "\r\n", ": ");
    //   const type = payload["Content-Type"];
    //   console.log(payload, type);
    // });

    cxt.body = {
      code: 200,
      data: cxt,
    };
  }
}

module.exports = new UploadController();
