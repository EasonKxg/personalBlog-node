const MomentService = require("../../service/moment/moment-service");
const errorTypes = require("../../global/error-types");
const { reqSuccess, delSuccess } = require("../../global/success-types");

class MomentController {
  // 新建
  async insertMoment(cxt, next) {
    try {
      const { name, id } = cxt.user;
      const { title, conent } = cxt.request.body;
      if (!title || !conent) {
        const error = new Error(errorTypes.PARAMETER_IS_NULL);
        cxt.app.emit("error", error, cxt);
        return;
      }
      await MomentService.insert(id, name, title, conent);
      cxt.body = reqSuccess;
    } catch (error) {
      console.log(error, "MomentController");
    }
  }
  // 更新
  async updateMoment(cxt, next) {
    try {
      const { id, title, conent } = cxt.request.body;
      if (!id || !title || !conent) {
        const error = new Error(errorTypes.PARAMETER_IS_NULL);
        cxt.app.emit("error", error, cxt);
        return;
      }
      // 查询动态是否存在
      const momentDetail = await MomentService.getMomentById(id);
      if (!momentDetail.length) {
        const error = new Error(errorTypes.NO_DATA);
        cxt.app.emit("error", error, cxt);
        return;
      }
      await MomentService.update(id, title, conent);
      cxt.body = reqSuccess;
    } catch (error) {
      console.log(error, "MomentController");
    }
  }
  // 删除
  async deleteMoment(cxt, next) {
    try {
      const { id } = cxt.request.body;
      if (!id) {
        const error = new Error(errorTypes.PARAMETER_IS_NULL);
        cxt.app.emit("error", error, cxt);
        return;
      }
      // 查询动态是否存在
      const momentDetail = await MomentService.getMomentById(id);
      if (!momentDetail.length) {
        const error = new Error(errorTypes.NO_DATA);
        cxt.app.emit("error", error, cxt);
        return;
      }
      await MomentService.delete(id);
      cxt.body = delSuccess;
    } catch (error) {
      console.log(error, "MomentController");
    }
  }
}

module.exports = new MomentController();
