import { test, expect } from "../../../../fixtures/tokenFixture.js";
import { UserClient } from "../../../../clients/userClient.js";
import { TransactionFactory } from "../../../../factories/transactionFactory.js";
import { DbClient } from "../../../../db/dbClient.js";
import { transactionQueries } from "../../../../db/Queries/TransactionQueries.js";
import { loadCreatedQuery3 } from "../../../../db/Queries/LoadCreatedQuery3.js";
import { loadCreatedQuery2 } from "../../../../db/Queries/LoadCreatedQuery2.js";
import { CallbackDataMapper } from "../../../../utils/callbackDataMapper.js";
import { errors } from "@playwright/test";

const dbClient = new DbClient();

// 🔁 Shared state INSIDE this spec only
let transactionId;
let senderMessageId;
let correlationId;
let nativeTransactionId;
let responseCorrelationId;
let dbResult;

test.describe.serial("Salary Transaction Workflow", () => {

  test("Step 1: Validate Transaction", async ({ request, token }) => {
    const userClient = new UserClient(request, token);
    // ---------- Build Payload ----------
    const payload = TransactionFactory.createTransactionPayload();
    // ---------- Execute API ----------
    const response = await userClient.validation(payload);
    const body = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(body).toHaveProperty("clientCorrelationID");
    responseCorrelationId = body.clientCorrelationID;
    console.log("CorrelationID from validation response :", responseCorrelationId);


    // ---------- DB Polling ----------
    correlationId = body.clientCorrelationID;
    const maxRetries = 10;
    const delayMs = 1500;

    //Check if callback_data from SAG exists
    
    for (let i = 0; i < maxRetries; i++) {
      const dbResult = await dbClient.query(transactionQueries.getSalaryTransactionPassedSAGResponse,
        [correlationId]
      );
      console.log(`DB Result validation (attempt ${i + 1}):`,
        JSON.stringify(dbResult, null, 2)
      );
      
      //---------If it exists, extract transactionId and senderMessageId & nativeTransID for next steps

      if (dbResult.length <= 0) {//If It does not exists

        //Poll the DB

        const maxRetries = 5;
        const delayMs = 2000;
        let callbackFound = false;

        for (let i = 0; i < maxRetries; i++) {
          const dbResult = await dbClient.query(
            transactionQueries.getSalaryTransactionFailedSAGResponse,
            [correlationId]
          );

          console.log(
            `DB Poll successful SAG (attempt ${i + 1}):`,
            JSON.stringify(dbResult, null, 2)
          );

          // Find a row with callback_data string
          const rowWithCallback = dbResult.find(
            row => typeof row.callback_data === "string" && row.callback_data.length > 0
          );

          if (rowWithCallback) {
            try {
              const callbackDataString = rowWithCallback.callback_data;
              const callbackDataJson = JSON.parse(callbackDataString);

              // ✅ Extract fields based on real JSON structure
              cbSenderMessageId = callbackDataJson.isInfo.senderMessageId;
              cbTransactionId = callbackDataJson.responseDetail.transactions[0].transactionId;
              cbNativeTransactionId = callbackDataJson.responseDetail.transactions[0].nativeTransactionId;

              console.log("Callback_data extracted fields:", {
                cbTransactionId,
                cbNativeTransactionId,
                cbSenderMessageId,
              });

              callbackFound = true;
              break; // stop polling once found
            } catch (err) {
              throw new Error(
                `Failed to parse callback_data JSON or extract fields: ${err.message}`
              );
            }
          }

          console.log(`No callback_data yet — retrying in ${delayMs}ms`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }

        // Simulate callback_data if was never found
        if (!callbackFound) {
          console.warn(
            "callback_data not found in DB — will generate new nativeTransactionId and proceed"
          );

          transactionId = dbResult[0].transactionIDSAGReqPayload;
          senderMessageId = dbResult[0].senderID;
          //cbNativeTransactionId = dbResult[0].nativeTransactionIDSAGReqPayload;
          //break;
        }

        console.log(`Waiting for DB record... (${i + 1}/${maxRetries})`);
        await new Promise(res => setTimeout(res, delayMs));
        //console.log("Database results",dbResult);
      }

      expect(transactionId).toBeDefined();
      expect(senderMessageId).toBeDefined();


      console.log("Database results after validation ", dbResult)
      //expect(result.CallbackDataMapper, "Luyanda");
      /*
          console.log("Transaction ID:", transactionId);
          console.log("Sender Message ID:", senderMessageId);
      */
      //I will add asserts here to confirm a successful validation, for now I can see success on the console
    });

  let cbTransactionId;
  let cbNativeTransactionId;
  let cbSenderMessageId;




  test("Step 2: Load Created Transaction", async ({ request, token }) => {
    const userClient = new UserClient(request, token);

    // Fail fast if Step 1 did not populate values
    if (!transactionId || !senderMessageId || !correlationId) {
      throw new Error(
        `Missing Step 1 values:
        transactionId=${transactionId}
        senderMessageId=${senderMessageId}
        correlationId=${correlationId}`
      );
    }

    console.log("Step 2 using values from Step 1:", {
      transactionId,
      senderMessageId,
      correlationId,
    });

    // -----------------------------
    // Poll DB for callback_data before generating new nativeTransactionId
    // -----------------------------
    const maxRetries = 5;
    const delayMs = 2000;
    let callbackFound = false;

    for (let i = 0; i < maxRetries; i++) {
      const dbResult = await dbClient.query(
        loadCreatedQuery3.getSalaryTransactionFailedSAGResponsePostLoadCreatedMock,
        [correlationId]
      );

      console.log(
        `DB Poll (attempt ${i + 1}):`,
        JSON.stringify(dbResult, null, 2)
      );

      // Find a row with callback_data string
      const rowWithCallback = dbResult.find(
        row => typeof row.callback_data === "string" && row.callback_data.length > 0
      );

      if (rowWithCallback) {
        try {
          const callbackDataString = rowWithCallback.callback_data;
          const callbackDataJson = JSON.parse(callbackDataString);

          // ✅ Extract fields based on real JSON structure
          cbSenderMessageId = callbackDataJson.isInfo.senderMessageId;
          cbTransactionId = callbackDataJson.responseDetail.transactions[0].transactionId;
          cbNativeTransactionId = callbackDataJson.responseDetail.transactions[0].nativeTransactionId;

          console.log("Callback_data extracted fields:", {
            cbTransactionId,
            cbNativeTransactionId,
            cbSenderMessageId,
          });

          callbackFound = true;
          break; // stop polling once found
        } catch (err) {
          throw new Error(
            `Failed to parse callback_data JSON or extract fields: ${err.message}`
          );
        }
      }

      console.log(`No callback_data yet — retrying in ${delayMs}ms`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    // Simulate callback_data if was never found
    if (!callbackFound) {
      console.warn(
        "callback_data not found in DB — will generate new nativeTransactionId and proceed"
      );

      // -----------------------------
      // Generate nativeTransactionId (new transaction)
      // -----------------------------
      const randomMiddleNumber = Math.floor(Math.random() * (170 - 151 + 1) + 151);
      const middlePadded = String(randomMiddleNumber).padStart(9, "0");
      nativeTransactionId = `P926 -EF-${middlePadded}-00000100`;

      console.log("Generated new nativeTransactionId:", nativeTransactionId);
    } else {
      // Use callback_data values for Step 3
      transactionId = cbTransactionId;
      nativeTransactionId = cbNativeTransactionId;
      senderMessageId = cbSenderMessageId;
    }

    // -----------------------------
    // Build payload for Load Created
    // -----------------------------
    const payload = TransactionFactory.loadCreatedSalaryPayload({
      transactionId,
      senderMessageId,
      nativeTransactionId,
      correlationId,
    });

    //console.log("Load Created Payload to send:", JSON.stringify(payload, null, 2));

    // Intentionally wait 5 seconds for backend processing
    /*await test.step("Wait 5 seconds for backend processing", async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));
    });
*/
    // -----------------------------
    // Call Load Created API
    // -----------------------------
    /*const response = await userClient.loadCreatedSalary(payload);
    expect(response.status()).toBe(200);
    console.log("Load Created API call successful");

    */
  });

  test("Step 3: Processed to Bank Transaction", async ({ request, token }) => {
    const userClient = new UserClient(request, token);

    await test.step("Wait 15 seconds for backend processing", async () => {
      await new Promise(resolve => setTimeout(resolve, 15000));
    });

    // -----------------------------
    // Build Processed-to-Bank payload
    // -----------------------------
    const payload = TransactionFactory.processedToBankPayload({
      transactionId: cbTransactionId,
      nativeTransactionId: cbNativeTransactionId,
      senderMessageId: cbSenderMessageId,
      correlationId,
    });

    console.log("Processed to Bank payload:", JSON.stringify(payload, null, 2));

    // -----------------------------
    // Call API
    // -----------------------------
    const response = await userClient.processedToBankSalary(payload);

    console.log("Processed to Bank URL:", response.url());

    console.log("Processed to Bank status:", response.status());

    const responseBody = await response.json();
    console.log(
      "Processed to Bank response body:",
      JSON.stringify(responseBody, null, 2)
    );

    // -----------------------------
    // Assertions
    // -----------------------------
    expect(response.status()).toBe(200);
    //expect(responseBody?.responseHeader?.responseCode).toBe("PROCESSED");
  });



  test("Step 4: Cashed Transaction", async ({ request, token }) => {
    const userClient = new UserClient(request, token);

    await test.step("Wait 15 seconds for backend processing", async () => {
      await new Promise(resolve => setTimeout(resolve, 15000));
    });

    // -----------------------------
    // Build Cashed payload
    // -----------------------------
    const payload = TransactionFactory.CashedPayload({
      transactionId: cbTransactionId,
      nativeTransactionId: cbNativeTransactionId,
      senderMessageId: cbSenderMessageId,
      correlationId,
    });

    console.log("Processed to Bank payload:", JSON.stringify(payload, null, 2));

    // -----------------------------
    // Call API
    // -----------------------------
    const response = await userClient.cashedSalary(payload);

    console.log("Cashed URL:", response.url());

    console.log("Cashed status:", response.status());

    const responseBody = await response.json();
    console.log(
      "Cashed response body:",
      JSON.stringify(responseBody, null, 2)
    );

    // -----------------------------
    // Assertions
    // -----------------------------
    expect(response.status()).toBe(200);
    //expect(responseBody?.responseHeader?.responseCode).toBe("PROCESSED");

  });

});
