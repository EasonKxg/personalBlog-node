const errorTypes = require("../../global/error-types");
const labelService = require("../../service/label/label-service");
const { reqSuccess, delSuccess } = require("../../global/success-types");

class LabelController {
  async labelList(cxt, next) {
    try {
      const data = await labelService.getLabelAllList();
      cxt.body = {
        code: 200,
        msg: "请求成功",
        data,
      };
    } catch (error) {
      console.log(error, "LabelController");
    }
  }
  async labelInsert(cxt, next) {
    try {
      const { name } = cxt.request.body;
      if (!name || name.length > 12) {
        const error = new Error(errorTypes.INCORRECT_PARAMETER);
        cxt.app.emit("error", error, cxt);
        return;
      }
      const labelDetail = await labelService.getLabelByName(name);
      if (labelDetail.length) {
        const error = new Error(errorTypes.DATA_IS_EXISTS);
        cxt.app.emit("error", error, cxt);
        return;
      }
      await labelService.insert(name);
      cxt.body = reqSuccess;
    } catch (error) {
      console.log(error, "LabelController");
    }
  }
  async labelUpdate(cxt, next) {
    // 查询是否为空
    const { id, name } = cxt.request.body;
    if (!id || !name || name.length > 12) {
      const error = new Error(errorTypes.INCORRECT_PARAMETER);
      cxt.app.emit("error", error, cxt);
      return;
    }
    const [labelDetail] = await labelService.getLabelById(id);
    if (!labelDetail) {
      const error = new Error(errorTypes.NO_DATA);
      cxt.app.emit("error", error, cxt);
      return;
    }

    await labelService.update(labelDetail.id, name);
    cxt.body = reqSuccess;
  }
  async labelDelete(cxt, next) {
    const { id } = cxt.request.body;
    if (!id) {
      const error = new Error(errorTypes.PARAMETER_IS_NULL);
      cxt.app.emit("error", error, cxt);
      return;
    }
    const labelDetail = await labelService.getLabelById(id);
    if (!labelDetail.length) {
      const error = new Error(errorTypes.NO_DATA);
      cxt.app.emit("error", error, cxt);
      return;
    }
    await labelService.delete(id);
    cxt.body = delSuccess;
  }
}

module.exports = new LabelController();
