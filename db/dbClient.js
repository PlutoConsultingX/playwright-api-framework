import mysql from "mysql2/promise";
import { dbConfig } from "./dbConfig.js";

export class DbClient {
  constructor() {
    this.pool = mysql.createPool({
      uri: dbConfig.connectionString,
      ssl: dbConfig.ssl
    });
  }

  async query(queryText, params = []) {
    const [rows] = await this.pool.execute(queryText, params);
    return rows;
  }

  async close() {
    await this.pool.end();
  }
}
