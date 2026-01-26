import { test, expect } from "../../../../fixtures/tokenFixture.js";
import { UserClient } from "../../../../clients/userClient.js";
import { DbClient } from "../../../../db/dbClient.js";
import { transactionQueries } from "../../../../db/Queries/TransactionQueries.js";

const dbClient = new DbClient(); // shared per worker

/*test("Load Created Test - Continue Salary Transaction Workflow", async ({ request, token }) => {
  const userClient = new UserClient(request, token);

  // ---------------------------------------------------
  // 1️⃣ Fetch the latest validated transaction from DB
  // ---------------------------------------------------
  const dbResult = await dbClient.query(
    transactionQueries.getLatestValidatedSalaryTransaction,
    []
  );

  expect(dbResult.length).toBeGreaterThan(0);

  const transactionId = dbResult[0].transaction_id;
  const senderMessageId = dbResult[0].senderID;

  console.log("Continuing transaction:");
  console.log("Transaction ID:", transactionId);
  console.log("Sender Message ID:", senderMessageId);

  // ---------------------------------------------------
  // 2️⃣ Call Load Created API using SAME token
  // ---------------------------------------------------
  const payload = {
    transactionId,
    senderMessageId,
  };

  const response = await userClient.loadCreated(payload);
  const body = await response.json();

  console.log("Load Created Response:", body);

  // ---------------------------------------------------
  // 3️⃣ Assertions
  // ---------------------------------------------------
  expect(response.status()).toBeGreaterThanOrEqual(200);
  expect(body).toHaveProperty("status");
  expect(body.status).toBe("LOADED");

  // ---------------------------------------------------
  // 4️⃣ Optional: DB verification
  // ---------------------------------------------------
  const loadDbResult = await dbClient.query(
    transactionQueries.getLoadedTransaction,
    [transactionId]
  );

  expect(loadDbResult.length).toBeGreaterThan(0);
});
*/