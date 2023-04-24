const pool = require("@/app/pool");
class UserService {
  async inster(name, password) {
    const text = `INSERT INTO users(name,password) VALUES(?,?);`;
    const result = pool.execute(text, [name, password]);
    return result;
  }
  // 获取用户信息
  async getUserByName(name) {
    try {
      const text = `SELECT * FROM users WHERE name = ?;`;
      const [result] = await pool.execute(text, [name]);
      return result;
    } catch (error) {
      +console.log(error);
    }
  }
  // 删除用户
  async deleteUserById(userId) {
    const text = `DELETE FROM users WHERE id = ?;`;
    const [result] = await pool.execute(text, [userId]);
    return result;
  }

  async updateUserById(name, userId) {
    const text = `UPDATE users SET name = ? WHERE id = ?;`;
    const [result] = await pool.execute(text, [name, userId]);
    return result;
  }
}

module.exports = new UserService();
