import { test as base } from '@playwright/test';
import { AuthClient } from '../clients/authClient.js';

export const test = base.extend({
  token: async ({ request }, use) => {
    const authClient = new AuthClient(request);
    const token = await authClient.generateToken();
    await use(token);
  }
});

export const expect = test.expect;