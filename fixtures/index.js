// fixtures/index.js
import { test as base, expect } from '@playwright/test';
import { UserClient } from '../clients/userClient.js';
import { DbClient } from '../db/dbClient.js';

// Load environment variables
const KEYCLOAK_URL = process.env.KEYCLOAK_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

export const test = base.extend({
  // Token fixture (test-scoped)
  token: async ({ request }, use) => {
    if (!KEYCLOAK_URL || !CLIENT_ID || !CLIENT_SECRET || !USERNAME || !PASSWORD) {
      throw new Error(
        `Missing one or more environment variables for Keycloak token request:
        KEYCLOAK_URL=${KEYCLOAK_URL}
        CLIENT_ID=${CLIENT_ID}
        CLIENT_SECRET=${CLIENT_SECRET ? '****' : undefined}
        USERNAME=${USERNAME}
        PASSWORD=${PASSWORD ? '****' : undefined}`
      );
    }

    console.log("Requesting token from Keycloak at:", KEYCLOAK_URL);

    let res;
    try {
      res = await request.post(KEYCLOAK_URL, {
        form: {
          grant_type: 'password',
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          username: USERNAME,
          password: PASSWORD,
          scope: 'openid',
        },
        timeout: 10000, // 10s timeout
      });
    } catch (err) {
      throw new Error(
        `Failed to connect to Keycloak. Check network/firewall/VPN and URL.\nOriginal error: ${err.message}`
      );
    }

    const rawBody = await res.text();

    // Log status and snippet of response
    console.log(`Keycloak response status: ${res.status()}`);
    console.log(`Keycloak response body (first 500 chars): ${rawBody.slice(0, 500)}`);

    let data;
    try {
      data = JSON.parse(rawBody);
    } catch {
      throw new Error(
        `Token request returned non-JSON response. Likely network/firewall issue, wrong KEYCLOAK_URL, or blocked request.\nFull response:\n${rawBody}`
      );
    }

    if (!data.access_token) {
      throw new Error(
        `No access_token returned from Keycloak. Full response:\n${JSON.stringify(data, null, 2)}`
      );
    }

    console.log("Successfully retrieved access token from Keycloak.");
    await use(data.access_token);
  },

  // Expose Playwright request objects
  validationRequest: async ({ request }, use) => use(request),
  loadRequest: async ({ request }, use) => use(request),

  // transactionContext (test-scoped)
  transactionContext: async ({ request, token }, use) => {
    const dbClient = new DbClient();
    const userClient = new UserClient(request, token);
    await use({ dbClient, userClient });
  },
});

export { expect };
