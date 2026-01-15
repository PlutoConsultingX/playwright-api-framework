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
      //requestDate: "2026-01-15T08:13:00",
      requestDate: Helpers.getExactFormatCurrentDateTime(),
      totalCount: 1,
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
            accountNumber: "62006677069",
            accountType: "02",
            branchCode: "250655",
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
        "sag-correlation-id": Helpers.generateGUID()
      },
      data: payload   // send JSON body exactly as expected
    });
    const responseBody = await response.json();
    console.log("API Response Status:", response.status());
    console.log("API Response Body:", JSON.stringify(responseBody, null, 2));

    return response;
  }



  //----------Processed EFT Payment Request ----------
  async processedToBank() {
    // Build payload dynamically

    const payloadProcessedToBank = {
      Response: {
        ISInfo: {
          serviceId: "FACS-EFT-TRANSACTION-01",
          responseId: "{{$guid}}",
          isCorrelationId: "c5919c23-a691-4cc8-a3fe-b918b9c04f94",
          senderMessageId: "ba4f6f3a-6486-40da-9f95-ad85a011d7c4"
        },
        responseDetail: {
          transactions: [
            {
              transactionId: "e1f77f6f-e987-4e0f-ac6f-3db59c4eb7ee",
              actionDate: Helpers.getCurrentDate(),
              actionDate: Helpers.getCurrentDate(),
              nativeTransactionId: "E238 -DO-000000007-00000100",
              serviceType: "EFTCOLLECTION",
              transactionError: {
                errorCode: "",
                errorDescription: ""
              },
              transactionAmount: "100",
              transactionResponse: {
                responseType: "PROCESSED",
                responseDescription: "Processed to bank"
              }
            }
          ]
        },
        responseHeader: {
          totalCount: 1,
          responseCode: "PROCESSED",
          responseType: "RESPONSE",
          clientProfile: "FACHYTQ1",
          responseTimestamp: Helpers.getCurrentDate(),
          nativeMsgId: "11049bd1-5fea-4bb2-b97e-0afa064ac82a",
          clientIntegrationId: "HYT0003"
        }
      }
    }

  }
  async loadCreatedEFT() {
    // Build payload dynamically
    const payloadLoadCreated = {
      Response: {
        ISInfo: {
          serviceId: "FACS-SALARYDAY-TRANSACTION-01",
          responseId: "{{$guid}}",
          //replace isCorrelation and senderMessageID and TransactioID with parameters---
          isCorrelationId: "4332489f-7273-4f93-b989-53436a1277ab",
          senderMessageId: "8381a889-c20a-4d6b-8c33-ca77d605ed52"
        },
        responseDetail: {
          transactions: [
            {
              transactionId: "fedc6743-8971-4e89-b868-e5f3328e0562",
              actionDate: Helpers.getCurrentDate(),
              effectiveDate: Helpers.getCurrentDate(),
              serviceType: "EFTPAYMENT",
              transactionError: {
                errorCode: "",
                errorDescription: ""
              },
              transactionAmount: "100",
              transactionResponse: {
                responseType: "CREATED",
                responseDescription: "Transaction created"
              }
            }
          ]
        },
        responseHeader: {
          totalCount: 1,
          responseCode: "PROCESSED",
          responseType: "LOAD",
          clientProfile: "FACHYTQ1",
          responseTimestamp: Helpers.getCurrentDate(),
          clientIntegrationId: "HYT0002"
        }
      }
    }
  }
}

