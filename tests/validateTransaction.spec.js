import { test, expect } from "../fixtures/tokenFixture.js";
import { UserClient } from "../clients/userClient.js";
import { TransactionFactory } from "../factories/transactionFactory.js";


test("Validation Test - POST Transaction Workflow", async ({ request, token }) => {
  const userClient = new UserClient(request, token);

  // ---------- Build Payload from Factory ----------
  const payload = TransactionFactory.createTransactionPayload();

  // ---------- Execute API Request ----------
  const response = await userClient.validation(payload);

  // ---------- Basic Validations ----------
  expect(response.status(), "Expected successful HTTP status").toBeGreaterThanOrEqual(200);
  expect(response.status()).toBeLessThan(300);

  const body = await response.json();
  console.log("API Response:", body);

  // ---------- Deep Response Validations ----------
  expect(body).toHaveProperty("workflowID");
  expect(body.workflowID).toBe(payload.workflowID);

  expect(body).toHaveProperty("clientCorrelationID");
  expect(body.clientCorrelationID).toBe(payload.clientCorrelationID);

  expect(body.transactions.length).toBe(1);

  const tx = body.transactions[0];

  expect(tx.transactionID).toBe(payload.transactions[0].transactionID);
  expect(tx.transactionAmount).toBe(300);
  expect(tx.actionDate).toBe(payload.transactions[0].actionDate);

  // subjectDetails validations
  expect(tx.subjectDetails.firstName).toBe("Molly");
  expect(tx.subjectDetails.lastName).toBe("Thato");
  expect(tx.subjectDetails.country).toBe("ZAF");
});
