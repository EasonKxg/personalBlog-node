const articleService = require("../../service/article/article-service");

class articleController {
  async articleList(cxt, next) {
    try {
      const data = await articleService();
      console.log(data, "data");
    } catch (error) {
      console.log(error, "articleController");
    }
  }
  async articleInsert(cxt, next) {
    try {
      console.log(cxt);
      cxt.body = {
        code: 200,
        data: [],
        msg: "请求成功",
      };
      
    } catch (error) {
      console.log(error, "articleController");
    }
  }
}

module.exports = new articleController();
