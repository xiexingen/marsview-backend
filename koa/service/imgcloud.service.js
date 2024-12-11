const connection = require('../sql');

class ImgCloudService {
  // 查询总条数
  async listCount(user_id) {
    const statement = 'SELECT COUNT(`id`) total FROM imgcloud';
    const [result] = await connection.execute(statement, [user_id]);
    return result[0];
  }

  async list(user_id, pageNum = 1, pageSize = 10) {
    const offset = (+pageNum - 1) * pageSize + '';
    const limit = pageSize;
    const statement = `
    SELECT 
      id,
      user_id as userId,
      user_name as userName,
      origin_name as originName,
      file_name as fileName,
      type,
      size,
      url,
      created_at as createdAt
    FROM 
      imgcloud  
    ORDER BY created_at DESC LIMIT ${offset},${limit};`;
    const [result] = await connection.execute(statement, [user_id]);
    return result;
  }

  async getTotalByUserId(user_id) {
    const statement = 'SELECT COUNT(`id`) total FROM imgcloud WHERE user_id = ?;';
    const [result] = await connection.execute(statement, [user_id]);
    return result[0];
  }

  async create(userId, userName, originName, fileName, type, size, url) {
    const statement = 'INSERT INTO imgcloud (user_id, user_name, origin_name, file_name, type, size, url ) VALUES (?, ?, ?, ?, ?, ?, ?);';
    const [result] = await connection.execute(statement, [userId, userName, originName, fileName, type, size, url]);
    return result;
  }

  async delete(id, userId) {
    let result = [];
    const statement = 'DELETE FROM imgcloud WHERE id = ? && user_id = ?';
    [result] = await connection.execute(statement, [id, userId]);

    return result;
  }
}

module.exports = new ImgCloudService();
