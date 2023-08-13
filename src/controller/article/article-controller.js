const ArticleService = require("../../service/article/article-service");
const LabelService = require("../../service/label/label-service");
const errorTypes = require("@/global/error-types");
class articleController {
  async articleList(cxt, next) {
    try {
      const data = await ArticleService.list();
      console.log(data, "data");
      cxt.body = {
        code: 200,
        data: data,
        msg: "请求成功",
      };
    } catch (error) {
      console.log(error, "articleController");
    }
  }
  async articleInsert(cxt, next) {
    try {
      const { id: userId } = cxt.user;
      const { labelId, content, title, author } = cxt.request.body;
      if (!labelId || !title || !content || !author) {
        const error = new Error(errorTypes.PARAMETER_IS_NULL);
        cxt.app.emit("error", error, cxt);
        return;
      }
      const labelData = await LabelService.getLabelById(labelId);
      if (!labelData.length) {
        const error = new Error(errorTypes.NO_DATA);
        cxt.app.emit("error", error, cxt);
        return;
      }

      const params = {
        userId,
        labelId,
        author,
        title,
        content,
      };
      await ArticleService.insert(params);
      cxt.body = {
        code: 200,
        data: [],
        msg: "请求成功",
      };
    } catch (error) {
      console.log(error, "articleController");
    }
  }

  async articleDelById(cxt, next) {
    try {
      const { articleId } = cxt.request.params;

      if (!articleId) {
        const error = new Error(errorTypes.PARAMETER_IS_NULL);
        cxt.app.emit("error", error, cxt);
        return;
      }
      const articleList = await ArticleService.getArticleById(articleId);
      if (!articleList.length) {
        const error = new Error(errorTypes.NO_DATA);
        cxt.app.emit("error", error, cxt);
        return;
      }

      await ArticleService.delArticleById(articleId);
      cxt.body = {
        code: 200,
        data: [],
        msg: "删除成功",
      };
    } catch (error) {
      console.log(error, "articleController");
    }
  }

  async articleUpdate(cxt, next) {
    try {
      const { articleId, title, author, content } = cxt.request.body;
      if (!articleId || !title || !author || !content) {
        const error = new Error(errorTypes.PARAMETER_IS_NULL);
        cxt.app.emit("error", error, cxt);
        return;
      }

      const articleList = await ArticleService.getArticleById(articleId);
      if (!articleList.length) {
        const error = new Error(errorTypes.NO_DATA);
        cxt.app.emit("error", error, cxt);
        return;
      }

      const req = {
        articleId,
        title,
        author,
        content,
      };
      const data = await ArticleService.updateArticle(req);
      if (data) {
        cxt.body = {
          code: 200,
          data: [],
          msg: "请求成功",
        };
      }
    } catch (error) {
      console.log(error, "articleController");
    }
  }
}

module.exports = new articleController();
