
  export const dbConfig = {
    // Build the connection URL from environment variables or fall back to defaults
    url:
      process.env.DATABASE_URL ||
      `mysql://${process.env.DB_USER || "svk_wkserv_qa"}:${
        process.env.DB_PASSWORD || "5GA45VGHC3skCQF8sYx0dxMDH"
      }@${process.env.DB_HOST || "localhost"}:${
        process.env.DB_PORT || 3306
      }/${process.env.DB_NAME || "qa_db"}?ssl=false`,
  };