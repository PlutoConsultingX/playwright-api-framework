import mysql from "mysql2/promise";
import { loadEnvironment } from "../utils/loadEnvironment.js";

loadEnvironment("qa");

/**
 * MariaDB dialog authentication plugin
 * mysql2 expects: authPlugins[name] -> () => (pluginData) => Buffer
 */
function dialogAuthPlugin(password) {
  return () => {
    return () => {
      return Buffer.from(password + "\0");
    };
  };
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 15000,

  authPlugins: {
    dialog: dialogAuthPlugin(process.env.DB_PASSWORD),
  },
});

export class DbClient {
  async query(sql, params = []) {
    const [rows] = await pool.query(sql, params);
    return rows;
  }

  async healthCheck() {
    const [rows] = await pool.query("SELECT 1 AS ok");
    return rows[0].ok === 1;
  }

  async close() {
    await pool.end();
  }
}
