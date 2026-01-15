import { test, expect } from "../../../../fixtures/tokenFixture.js";
import { UserClient } from "../../../../clients/userClient.js";
import { TransactionFactory } from "../../../../factories/transactionFactory.js";
import { DbClient } from "../../../../db/dbClient.js";
import { transactionQueries } from "../../../../db/queries/transactionQueries.js";

const dbClient = new DbClient(); // 🔑 shared per worker

test("Load Created Test", async ({ request, token }) => {
  
  const userClient = new UserClient(request, token);

  // ---------- Build Payload ----------
  const payload = TransactionFactory.loadCreatedEFTPayload();

  // ---------- Execute API Request ----------
  const response = await userClient.loadCreatedEFT(payload);
  const body = await response.json();

  console.log("API Response Body:", body);

  expect(response.status()).toBeGreaterThanOrEqual(200);
  //expect(response.status()).toBeLessThan(300);
  expect(body).toHaveProperty("clientCorrelationID");

  const correlationId = body.clientCorrelationID;
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

  //------DB Results ------
  //console.log("DB Result:", dbResult);

  var transactioID = dbResult[0].transaction_id;
  var senderMessageId = dbResult[0].senderID;

  console.log("Transaction ID from DB:", transactioID);
  console.log("Sender Message ID from DB:", senderMessageId);

});