/*
import { test, expect } from "../../../fixtures/tokenFixture.js";
import { UserClient } from "../../../clients/userClient.js";
import { TransactionFactory } from "../../../factories/transactionFactory.js";


test("Validation Test - POST Transaction Workflow", async ({ request, token }) => {
  const userClient = new UserClient(request, token);

  // ---------- Build Payload from Factory ----------
  const payload = TransactionFactory.createTransactionPayload();

  // ---------- Execute API Request ----------
  const response = await userClient.validation(payload);

  // ---------- Basic Validations ----------
  
  const body = await response.json();
  console.log("API Response Body Papitoooo:", body);

 

  if (response.status() >= 300) {
    console.error("Validation failed with status", response.status());
    console.error(body);
  }

  expect(response.status(), "Expected successful HTTP status").toBeGreaterThanOrEqual(200);
  expect(response.status()).toBeLessThan(300);

  

  // ---------- Deep Response Validations ----------
  //expect(body).toHaveProperty("workflowID");
  //expect(body.workflowID).toBe(payload.workflowID);

  expect(body).toHaveProperty("clientCorrelationID");
  expect(body.clientCorrelationID).toBe(body.clientCorrelationID);

  //expect(body.transactions.length).toBe(2);

  //const tx = body.transactions[0];

  expect(tx.transactionID).toBe(payload.transactions[0].transactionID);
  expect(tx.transactionAmount).toBe(300);
  expect(tx.actionDate).toBe(payload.transactions[0].actionDate);

  // subjectDetails validations
  expect(tx.subjectDetails.accountNumber).toBe("62006677069");
  expect(tx.subjectDetails.accountType).toBe("02");
  expect(tx.subjectDetails.country).toBe("ZAF");
  

 
}); */

//-------------Include DB-----------------
import { test, expect } from "../../../fixtures/tokenFixture.js";
import { UserClient } from "../../../clients/userClient.js";
import { TransactionFactory } from "../../../factories/transactionFactory.js";
import { DbClient } from "../../../db/dbClient.js";
import { transactionQueries } from "../../../db/queries/transactionQueries.js";

test("Validation Test - POST Transaction Workflow", async ({ request, token }) => {
  const userClient = new UserClient(request, token);
  const dbClient = new DbClient();

  // ---------- Build Payload ----------
  const payload = TransactionFactory.createTransactionPayload();

  // ---------- Execute API Request ----------
  const response = await userClient.validation(payload);
  const body = await response.json();

  console.log("API Response Body:", body);

  expect(response.status()).toBeGreaterThanOrEqual(200);
  expect(response.status()).toBeLessThan(300);

  expect(body).toHaveProperty("clientCorrelationID");

  // ---------- DB Validation ----------
  const dbResult = await dbClient.query(
    transactionQueries.getTransactionByCorrelationId,
    [body.clientCorrelationID]
  );

  console.log("DB Result:", dbResult);

  expect(dbResult.length).toBe(1);
  expect(dbResult[0].client_correlation_id).toBe(body.clientCorrelationID);

  // ---------- Cleanup ----------
  await dbClient.close();
});
