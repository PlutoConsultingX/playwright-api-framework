import mariadb from 'mariadb';
/*
// Environment variables (or fallback defaults)
const DB_URL = process.env.MARIA_DB_URL || 'jdbc:mariadb://10.10.21.153:23819/WORKFLOW_SERVICE'; // host:port/database
const DB_USER = process.env.MARIA_DB_USER || 'svc_wkfwrkavs_uat';
const DB_PASSWORD = process.env.MARIA_DB_PASSWORD || '5GA45VGHC3skCQF8sYx0dxMDH';
*/

//-----------------
import mariadb from "mariadb";

export class Database {
  constructor() {
    this.pool = mariadb.createPool({
      uri: process.env.DB_URL,         // full JDBC-style URL
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectionLimit: 5
    });
  }

  async query(sql, params = []) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      return await conn.query(sql, params);
    } finally {
      if (conn) conn.release();
    }
  }

  async close() {
    await this.pool.end();
  }
}
//----------------------------------------------
import mariadb from "mariadb";

export class Database {
  constructor() {
    this.pool = mariadb.createPool({
      uri: process.env.DB_URL,         // full JDBC-style URL
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectionLimit: 5
    });
  }

  async query(sql, params = []) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      return await conn.query(sql, params);
    } finally {
      if (conn) conn.release();
    }
  }

  async close() {
    await this.pool.end();
  }
}
