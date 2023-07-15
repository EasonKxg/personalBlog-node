
class TestController {
  async getData(cxt, next) {
    cxt.body = {
      code: 200,
      msg: "测试成功"
    }
  }
}

module.exports = new TestController();
