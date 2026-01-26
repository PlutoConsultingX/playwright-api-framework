import { test, expect } from "../../../../fixtures/tokenFixture.js";
import { UserClient } from "../../../../clients/userClient.js";
import { TransactionFactory } from "../../../../factories/transactionFactory.js";
import { DbClient } from "../../../../db/dbClient.js";
import { transactionQueries } from "../../../../db/Queries/TransactionQueries.js";
import { loadCreatedQuery } from "../../../../db/Queries/LoadCreatedQuery.js";
import { CallbackDataMapper } from "../../../../utils/callbackDataMapper.js";

const dbClient = new DbClient();

// 🔁 Shared state INSIDE this spec only
let transactionId;
let senderMessageId;
let correlationId;
let nativeTransactionId;
let responseCorrelationId;

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
    //console.log("Validate Response:", body);

    console.log("CorrelationID from validation response :", responseCorrelationId);


    // ---------- DB Polling ----------
    correlationId = body.clientCorrelationID;
    const maxRetries = 10;
    const delayMs = 1500;

    for (let i = 0; i < maxRetries; i++) {
      const dbResult = await dbClient.query(
        transactionQueries.getSalaryTransactionFailedSAGResponse,
        [correlationId]
      );

      console.log(
        `DB Result validation (attempt ${i + 1}):`,
        JSON.stringify(dbResult, null, 2)
      );

      if (dbResult.length > 0) {

        //correlationId = callback.isInfo.isCorrelationId;
        transactionId = dbResult[0].transaction_id;
        senderMessageId = dbResult[0].senderID;
        //isCorrelationId = dbResult[0].clientCorrelationID;
        break;
      }

      console.log(`Waiting for DB record... (${i + 1}/${maxRetries})`);
      await new Promise(res => setTimeout(res, delayMs));
      //console.log("Database results",dbResult);
    }

    expect(transactionId).toBeDefined();
    expect(senderMessageId).toBeDefined();
    //expect(result.CallbackDataMapper, "Luyanda");
    /*
        console.log("Transaction ID:", transactionId);
        console.log("Sender Message ID:", senderMessageId);
    */
    //I will add asserts here to confirm a successful validation, for now I can see success on the console
  });
  /*
    test("Step 2: Load Created Transaction", async ({ request, token }) => {
      /*const userClient = new UserClient(request, token);
  
      // 🔐 Same token (worker-scoped)
  
      expect(transactionId).toBeDefined();
      expect(senderMessageId).toBeDefined();
  
      const payload = TransactionFactory.loadCreatedEFTPayload();
      //console.log("Load Created Request:", payload);
  
      const response = await userClient.loadCreatedSalary(payload);
      const body = await response.json();
  
      console.log("Load Created Response:", body);
  
      //Lets get the database results to confirm SAG mocked response
      //correlationId = body.clientCorrelationID;
  
      // ---------- DB Polling ----------
      const maxRetries = 10;
      const delayMs = 2000;
      /*
          for (let i = 0; i < maxRetries; i++) {
            const dbResult = await dbClient.query(
              loadCreatedQuery.getSalaryTransactionFailedSAGResponsePostLoadCreatedMock,
              [correlationId]
      
            );
            
            console.log(`DB Result after load created (attempt ${i + 1}):`,
              JSON.stringify(dbResult, null, 2)
            );
            
  
            
  
            process.stdout.write(
              `DB Result after load created (attempt ${i + 1}):\n` +
              JSON.stringify(dbResult, null, 2) +
              "\n"
            );
            
            if (dbResult.length > 0) {
              transactionId = dbResult[0].transaction_id;
              senderMessageId = dbResult[0].senderID;
              
              break;
            }
  
      
            console.log(`Waiting for DB record... (${i + 1}/${maxRetries})`);
            await new Promise(res => setTimeout(res, delayMs));
            //console.log("Database results",dbResult);
            
           
  
          }  */
  /*  let callbackJson;

    for (let i = 0; i < maxRetries; i++) {
      const dbResult = await dbClient.query(
        loadCreatedQuery.getSalaryTransactionFailedSAGResponsePostLoadCreatedMock,
        [correlationId]   
      );
    
      process.stdout.write(
        `DB Result after load created (attempt ${i + 1}):\n` +
        JSON.stringify(dbResult, null, 2) +
        "\n"
      );
    
      if (dbResult.length > 0) {
        const row = dbResult[0];
    
       
        try {
          callbackJson = JSON.parse(row.callback_data);
        } catch (err) {
          throw new Error(
            `Failed to parse callback_data JSON: ${err.message}\n` +
            `Raw value:\n${row.callback_data}`
          );
        }
    
        break; // 👈 Exit polling once parsed
      }
    
      console.log(`Waiting for DB record... (${i + 1}/${maxRetries})`);
      await new Promise(res => setTimeout(res, delayMs));
    }
      
    let callbackJson;

    for (let i = 0; i < maxRetries; i++) {
      const dbResult = await dbClient.query(
        loadCreatedQuery.getSalaryTransactionFailedSAGResponsePostLoadCreatedMock,
        [correlationId]   
      );
    
      console.log(`Polling DB (attempt ${i + 1}) for clientCorrelationID: ${correlationId}`);
      console.log(`DB rows returned: ${dbResult.length}`);
    
      if (dbResult.length > 0) {
        const row = dbResult[0];
    
        try {
          callbackJson = JSON.parse(row.callback_data);
          // ✅ Log parsed JSON here
          console.log("Parsed callback_data JSON:", JSON.stringify(callbackJson, null, 2));
        } catch (err) {
          throw new Error(
            `Failed to parse callback_data JSON: ${err.message}\nRaw value:\n${row.callback_data}`
          );
        }
    
        break; // exit polling once we have valid data
      }
    
      console.log(`Waiting for DB record... (${i + 1}/${maxRetries})`);
      await new Promise(res => setTimeout(res, delayMs));
    }
    
    // At this point, callbackJson contains the parsed JSON
    

    //--------------Latest Working Load created----------------------
    const userClient = new UserClient(request, token);

    // 🔐 Ensure Step 1 succeeded
    expect(transactionId).toBeDefined();
    expect(senderMessageId).toBeDefined();
    expect(correlationId).toBeDefined();
  
    // ---------- Build Payload & Call API ----------
    const payload = TransactionFactory.loadCreatedEFTPayload();
    const response = await userClient.loadCreatedSalary(payload);
    const body = await response.json();
  
    console.log("Load Created API Response:", JSON.stringify(body, null, 2));
    
    // ---------- DB Polling for SAG response ----------
    const maxRetries = 10;
    const delayMs = 1500;
    let callbackJson;
  
    for (let i = 0; i < maxRetries; i++) {
      const dbResult = await dbClient.query(
        loadCreatedQuery.getSalaryTransactionFailedSAGResponsePostLoadCreatedMock,
        [correlationId] // Using the clientCorrelationID from Step 1
      );
  
      console.log(`Polling DB (attempt ${i + 1}) for clientCorrelationID: ${correlationId}`);
      console.log(`DB rows returned: ${dbResult.length}`);
  
      if (dbResult.length > 0) {
        const row = dbResult[0];
  
        // ---------- Parse callback_data ----------
        try {
          callbackJson = JSON.parse(row.callback_data);
          console.log("✅ Parsed callback_data JSON:", JSON.stringify(callbackJson, null, 2));
        } catch (err) {
          throw new Error(
            `Failed to parse callback_data JSON: ${err.message}\nRaw value:\n${row.callback_data}`
          );
        }
  
        break; // Exit polling once we have valid data
      }
  
      console.log(`Waiting for DB record... (${i + 1}/${maxRetries})`);
      await new Promise(res => setTimeout(res, delayMs));
    }
  
    // ---------- Assertions & Extract Fields ----------
    //expect(callbackJson).toBeDefined();
  
    const senderMessageIdFromCallback = callbackJson.isInfo?.senderMessageId;
    const isCorrelationIdFromCallback = callbackJson.isInfo?.isCorrelationId;
    const transactionIdFromCallback = callbackJson.responseDetail?.transactions?.[0]?.transactionId;
    const nativeTransactionIdFromCallback = callbackJson.responseDetail?.transactions?.[0]?.nativeTransactionId;
  
    expect(senderMessageIdFromCallback).toBeTruthy();
    expect(isCorrelationIdFromCallback).toBeTruthy();
    expect(transactionIdFromCallback).toBeTruthy();
    expect(nativeTransactionIdFromCallback).toBeTruthy();
  
    console.log("Extracted Fields from callback_data: Load Created");
    console.log("senderMessageId:", senderMessageIdFromCallback);
    console.log("isCorrelationId:", isCorrelationIdFromCallback);
    console.log("transactionId:", transactionIdFromCallback);
    console.log("nativeTransactionId:", nativeTransactionIdFromCallback);
    
 
});
*/

test("Step 2: Processed to bank Transaction", async ({ request, token }) => {
  const userClient = new UserClient(request, token);

  expect(transactionId).toBeDefined();
  expect(senderMessageId).toBeDefined();
  expect(correlationId).toBeDefined();

  const maxRetries = 15;
  const delayMs = 2000;

  let callbackJson;
  let payload;

  for (let i = 0; i < maxRetries; i++) {
    const dbResult = await dbClient.query(
      loadCreatedQuery.getSalaryTransactionFailedSAGResponsePostLoadCreatedMock,
      [correlationId]
    );

    console.log(`Polling DB (attempt ${i + 1}) for correlationId: ${correlationId}`);

    if (dbResult.length > 0) {
      const row = dbResult[0];

      callbackJson = JSON.parse(row.callback_data);
      console.log("✅ Parsed callback_data:", JSON.stringify(callbackJson, null, 2));

      const senderMessageIdFromCallback = callbackJson.isInfo?.senderMessageId;
      const transactionIdFromCallback =
        callbackJson.responseDetail?.transactions?.[0]?.transactionId;
      const nativeTransactionIdFromCallback =
        callbackJson.responseDetail?.transactions?.[0]?.nativeTransactionId;

      // ✅ Assert BEFORE building payload
      expect(senderMessageIdFromCallback).toBeTruthy();
      expect(transactionIdFromCallback).toBeTruthy();
      expect(nativeTransactionIdFromCallback).toBeTruthy();

      // ✅ Build payload ONCE
      payload = TransactionFactory.processedToBankPayload({
        senderMessageId: senderMessageIdFromCallback,
        transactionId: transactionIdFromCallback,
        nativeTransactionId: nativeTransactionIdFromCallback,
      });

      break;
    }

    await new Promise(res => setTimeout(res, delayMs));
  }

  // 🧱 Safety net
  expect(payload).toBeDefined();

  // ---------- Call API ----------
  const response = await userClient.processedToBankSalary(payload);
  const body = await response.json();

  console.log("Processed To Bank API Response:", JSON.stringify(body, null, 2));
  console.log("body",body);
});
  /*
   test("Step 4: Cashed Transaction", async ({ request, token }) => {
     const userClient = new UserClient(request, token);
 
     // 🔐 Same token (worker-scoped) -- replace with correct attributes from mocked SAG response
     expect(transactionId).toBeDefined();
     expect(senderMessageId).toBeDefined();
 
     const payload = TransactionFactory.loadCreatedEFTPayload();
     console.log("Load Created Request:", payload);
 
     const response = await userClient.processedToBankSalary(payload);
     const body = await response.json();
 
     console.log("Load Created Response:", body);
 
     //expect(response.ok()).toBeTruthy();
     //expect(body.status).toBe("LOADED");
   });
   */

});
