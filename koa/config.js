/**
 * 基础配置文件
 */

/**
 * MySQL数据库配置
 */
const SERVER_HOST = 'http://localhost';
const SERVER_PORT = 5000;
const DATABASE_HOST = 'localhost';
const DATABASE_PORT = 3306;
const DATABASE_USER = 'root';
const DATABASE_PASSWORD = 'Abcd1234';
const DATABASE_NAME = 'marsview';

/**
 * 飞书应用配置，用来发送飞书消息
 */
const FEISHU_APP_ID = '';
const FEISHU_APP_SECRET = '';

/**
 * JWT签名密钥和过期时间
 */
const JWT_SECRET = 'marsview';
const JWT_EXPIRES_IN = '7d';

/**
 * 百度云OSS配置 - 专属域名，会根据你的 bucket生成域名
 */
const OSS_ENDPOINT = 'https://xxg-marsview.bj.bcebos.com';
/**
 * 百度云OSS配置 - 传入Bucket所在区域域名,需要自己创建并拷贝名称
 */
const OSS_BUCKET1 = 'xxg-marsview';

/**
 * 百度云OSS配置 - 传入Bucket所在区域域名,需要自己创建并拷贝名称
 */
const OSS_BUCKET2 = 'xxg-marsvie2';
/**
 * 百度云OSS配置 - AccessKey
 */
const OSS_ACCESSKEY = '00ea65b2ce2a490098dc431a8730a017';
/**
 * 百度云OSS配置 - SecretAccessKey
 */
const OSS_ACCESSKEYSECRET = 'b1c8ac0f107c4db7aa31700eaf2f8ba0';

/**
 * 百度云OSS配置 - 对应OSS_BUCKET1的访问域名地址
 */
const OSS_CDNDOMAIN1 = 'https://xxg-marsview.bj.bcebos.com';
const OSS_CDNDOMAIN2 = 'https://xxg-marsview2.bj.bcebos.com';

/**
 * 邮箱服务配置
 */
const EMAIL_HOST = 'smtp.163.com';
const EMAIL_PORT = 465;
const EMAIL_USER = '';
const EMAIL_PASSWORD = '';

/**
 * 大模型配置
 */

const ZHIPU_AI_KEY = '';

module.exports = {
  SERVER_HOST,
  SERVER_PORT,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  FEISHU_APP_ID,
  FEISHU_APP_SECRET,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  OSS_ENDPOINT,
  OSS_BUCKET1,
  OSS_BUCKET2,
  OSS_ACCESSKEY,
  OSS_ACCESSKEYSECRET,
  OSS_CDNDOMAIN1,
  OSS_CDNDOMAIN2,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  ZHIPU_AI_KEY,
};
