const pool = require("../../app/pool");
class MomentService {
  async insert(userId, author, title, conent) {
    const text = `INSERT INTO moment(user_id,author,title,content) VALUES(?,?,?,?);`;
    const [result] = await pool.execute(text, [userId, author, title, conent]);
    return result;
  }
  async getMomentById(id) {
    const text = `SELECT * FROM moment WHERE id = ?;`;
    const [result] = await pool.execute(text, [id]);
    return result;
  }
  async update(momentId, title, conent) {
    const text = `UPDATE moment set title = ? ,content = ? WHERE id = ?;`;
    const [result] = await pool.execute(text, [title, conent, momentId]);
    return result;
  }
  async delete(momentId) {
    const text = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await pool.execute(text, [momentId]);
    return result;
  }
}

module.exports = new MomentService();
