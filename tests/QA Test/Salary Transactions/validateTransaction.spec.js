import { test, expect } from "../../../fixtures/tokenFixture.js";
import { UserClient } from "../../../clients/userClient.js";
import { TransactionFactory } from "../../../factories/transactionFactory.js";
import { DbClient } from "../../../db/dbClient.js";
import { transactionQueries } from "../../../db/queries/transactionQueries.js";

const dbClient = new DbClient(); // 🔑 shared per worker

test("Validation Test - POST Transaction Workflow", async ({ request, token }) => {
  const userClient = new UserClient(request, token);

  // ---------- Build Payload ----------
  const payload = TransactionFactory.createTransactionPayload();

  // ---------- Execute API Request ----------
  const response = await userClient.validation(payload);
  const body = await response.json();

  console.log("API Response Body:", body);

  expect(response.status()).toBeGreaterThanOrEqual(200);
  expect(response.status()).toBeLessThan(300);
  expect(body).toHaveProperty("clientCorrelationID");

  const correlationId = body.clientCorrelationID;

  console.log("SQL Query:", transactionQueries.getSalaryTransactionFailedSAGResponse);
  console.log("Params:", [body.clientCorrelationID]);

  // ---------- DB Validation (with polling) ----------
  let dbResult = [];
  const maxRetries = 10;
  const delayMs = 1000;

  for (let i = 0; i < maxRetries; i++) {
    dbResult = await dbClient.query(
      transactionQueries.getSalaryTransactionFailedSAGResponse,
      [correlationId]
    );

    if (dbResult.length > 0) break;

    console.log(`Waiting for DB record... (${i + 1}/${maxRetries})`);
    await new Promise(res => setTimeout(res, delayMs));
  }

  console.log("DB Result:", dbResult);
  

  //expect(dbResult.length).toBe(1);
  //expect(dbResult[0].client_correlation_id).toBe(correlationId);
});
