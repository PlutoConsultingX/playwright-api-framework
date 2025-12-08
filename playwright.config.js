import { defineConfig } from "@playwright/test";
import { loadEnvironment } from "./utils/env.js";

const ENV = loadEnvironment(process.env.ENV || "qa");

export default defineConfig({
  testDir: './tests', 
  timeout: 30000,
  retries: 1,

  use: {
    baseURL: ENV.BASE_URL,
    extraHTTPHeaders: {
      Accept: 'application/json',
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
