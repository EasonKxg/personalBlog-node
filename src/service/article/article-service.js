const pool = require("../../app/pool");

class articleService {
  async list() {
    const text = `SELECT * FROM article`;
    const [result] = await pool.execute(text);
    return result;
  }

  async insert(req) {
    const { userId, labelId, author, title, content } = req;
    const text = `INSERT INTO article(user_id,label_id,author,title,content) VALUES(?,?,?,?,?)`;
    const [result] = await pool.execute(text, [
      userId,
      labelId,
      author,
      title,
      content,
    ]);

    return result;
  }

  async updateArticle(req) {
    const { articleId, title, author, content } = req;
    const text = `UPDATE article SET title = ?,author = ? ,content = ? WHERE id = ?`;
    const [result] = await pool.execute(text, [
      title,
      author,
      content,
      articleId,
    ]);
    return result;
  }
  async delArticleById(articleId) {
    const text = `DELETE FROM article WHERE id = ?`;
    const [result] = await pool.execute(text, [articleId]);
    return result;
  }

  async getArticleById(articleId) {
    const text = `SELECT * FROM article WHERE id = ?`;
    const [result] = await pool.execute(text, [articleId]);
    return result;
  }
}

module.exports = new articleService();
