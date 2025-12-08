import fs from 'fs';
import path from 'path';

/**
 * Load environment configuration from JSON file
 * @param {string} env - Environment name (dev, qa, prod)
 * @returns {object} - Parsed environment variables
 */
export function loadEnvironment(env = 'qa') {
  const envPath = path.resolve('environments', `${env}.env.json`);

  if (!fs.existsSync(envPath)) {
    throw new Error(`Environment file not found: ${envPath}`);
  }

  console.log(`Loading environment from: ${envPath}`);
  const raw = fs.readFileSync(envPath, 'utf-8');
  return JSON.parse(raw);
}
