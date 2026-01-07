import { defineConfig } from "@playwright/test";
import { loadEnvironment } from "./utils/process.env";

const ENV = loadEnvironment(process.env.ENV || "qa");

export default defineConfig({
  testDir: './tests', 
  timeout: 30000,
  retries: 0,

  use: {
    baseURL: ENV.BASE_URL,
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },

  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],

  metadata: {
    environment: process.env.ENV || "qa"
  }
});
