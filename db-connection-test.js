import { DbClient } from "./db/dbClient.js";

(async () => {
  try {
    console.log("🔍 Testing MariaDB connection...");
    const db = new DbClient();

    const ok = await db.healthCheck();
    console.log("✅ DB health check:", ok);

    const dbName = await db.query("SELECT DATABASE() AS db");
    console.log("Connected to DB:", dbName[0].db);

  } catch (err) {
    console.error("❌ DB CONNECTION FAILED");
    console.error("Code:", err.code);
    console.error("Message:", err.message);
  }
})();
