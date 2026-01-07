import fs from "fs";
import path from "path";

/**
 * Load environment configuration from JSON file
 * and inject values into process.env
 * 
 * @param {string} env - Name of environment (e.g., "qa_db", "dev", "prod")
 * @returns {object} Parsed environment variables
 */
export function loadEnvironment(env = "qa") {
  // Build path to the JSON file
  const envPath = path.resolve("environments", `${env}.env.json`);

  if (!fs.existsSync(envPath)) {
    throw new Error(`Environment file not found: ${envPath}`);
  }

  console.log(`Loading environment from: ${envPath}`);

  // Read the JSON file
  const raw = fs.readFileSync(envPath, "utf-8");
  const config = JSON.parse(raw);

  // Inject all keys into process.env
  for (const [key, value] of Object.entries(config)) {
    process.env[key] = value;
  }

  console.log(`Environment "${env}" loaded successfully.`);
  return config;
}
const required = [
  "AUTH_URL",
  "CLIENT_ID",
  "CLIENT_SECRET",
  "GRANT_TYPE",
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`❌ Missing required env variable: ${key}`);
  }
}

