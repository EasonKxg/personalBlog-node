const pool = require("../../app/pool");

class LabelService {
  async insert(name) {
    const text = `INSERT INTO label(name) VALUES(?);`;
    const [result] = await pool.execute(text, [name]);
    return result;
  }
  async delete(labelId) {
    const text = `DELETE FROM label WHERE id = ?;`;
    const [result] = await pool.execute(text, [labelId]);
    return result;
  }

  async update(labelId, name) {
    const text = `UPDATE label set name = ? WHERE id = ?;`;
    const [result] = await pool.execute(text, [name, labelId]);
    return result;
  }

  async getLabelByName(name) {
    const text = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await pool.execute(text, [name]);
    return result;
  }
  async getLabelById(labelId) {
    const text = `SELECT * FROM label WHERE id = ?;`;
    const [result] = await pool.execute(text, [labelId]);
    return result;
  }
  async getLabelAllList() {
    const text = `SELECT * FROM label`;
    const [result] = await pool.execute(text);
    return result;
  }
}

module.exports = new LabelService();
