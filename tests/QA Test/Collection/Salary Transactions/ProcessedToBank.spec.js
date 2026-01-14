/*import { test, expect } from "../fixtures/tokenFixture.js";
import { UserClient } from "../clients/userClient.js";

test("Processed to Bank API - POST", async ({ request, token }) => {
  const userClient = new UserClient(request, token);

  const response = await userClient.processedToBank();
  const body = await response.json();

  console.log("ProcessedToBank Response:", body);

  expect(response.status()).toBeGreaterThanOrEqual(200);
  expect(response.status()).toBeLessThan(300);
  expect(body).toHaveProperty("transactionID");
  expect(body.amount).toBe(300);
});*/
