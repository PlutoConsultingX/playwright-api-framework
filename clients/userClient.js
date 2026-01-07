import { Helpers } from '../utils/helpers.js';
import { loadEnvironment } from '../utils/process.env';
const ENV = loadEnvironment(process.env.ENV || "qa_token");

export class UserClient {
  constructor(request, token) {
    this.request = request;   // Playwright APIRequestContext
    this.token = token;
  }

  
  async validation() {
    // Build payload dynamically
    const payload = {
      workflowID: "c5d1f3b5-508e-4f47-9997-a4912d486466",
      clientCorrelationID: Helpers.generateGUID(), 
      requestDate: "2026-01-07T08:13:00",
      totalCount:1,
      transactions: [
        {
          transactionID: Helpers.generateGUID(), 
          transactionAmount: 300,
          actionDate: Helpers.getCurrentDate(),
          subjectReference: "SREF000-23042025",
          clientReference: "CREF000-23042025",
          mandateReference: "00032024091612QRZ2ZDWW",
          contractReference: "Thato Auto",
          trackingDays: 10,
          collectionReoccurance: "OOFF",
          subjectDetails: {
            accountNumber:"62006677069",
            accountType: "02",
            branchCode:"250655",
            country: "ZAF",
            idType: "EntityRegistrationNumber",
            idValue: "1951/000009/07",
            initials: "SK",
            firstName: "john",
            lastName: "doe",
            phoneNumber: "+27721234567",
            emailAddress: "Hyphen@RMB.com",
            profileReference: "Thatos"
          }
        }
      ]
    };

   /* Load from file example
    async validation() {
    const payloadPath = path.resolve('payloads/QA/EFT/validation.json');
      // Read the JSON payload file
    const fileData = await fs.readFile(payloadPath, 'utf-8');
    const payload = JSON.parse(fileData);

    // Dynamically set IDs and dates
    payload.clientCorrelationID = Helpers.generateGUID();
    payload.transactions.forEach(tx => {
      tx.transactionID = Helpers.generateGUID();
      tx.actionDate = Helpers.getCurrentDate();
    });

    console.log("Validation Payload:", JSON.stringify(payload, null, 2));
  */

    console.log(JSON.stringify(payload, null, 2));
    // Send POST request
    const response = await this.request.post(ENV.BASE_URL, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "sag-correlation-id" : Helpers.generateGUID()
      },
      data: payload   // send JSON body exactly as expected
    });
    const responseBody = await response.json();
    console.log("API Response Status:", response.status());
    console.log("API Response Body:", JSON.stringify(responseBody, null, 2));

    return response;
  }
}


