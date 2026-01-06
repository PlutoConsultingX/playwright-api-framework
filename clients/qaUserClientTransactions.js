import { Helpers } from '../utils/helpers.js';
import { loadEnvironment } from '../utils/env.js';
const ENV = loadEnvironment(process.env.ENV || "qa");

export class UserClient {
  constructor(request, token) {
    this.request = request;   // Playwright APIRequestContext
    this.token = token;
  }

  //Access db first to retieve mandatory changed fields
  

  async processedToBank() {
    // Build payload dynamically
    const payload = {
        Response: {
          ISInfo: {
            serviceId: "FACS-EFT-TRANSACTION-01",
            responseId: Helpers.generateGUID(),
            isCorrelationId: Helpers.generateGUID(),
            senderMessageId: Helpers.generateGUID()
          },
          responseDetail: {
            transactions: [
              {
                transactionId: transactionId,
                actionDate: currentDate,
                effectiveDate: currentDate,
                nativeTransactionId: "E238-DO-000000007-00000100",
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
            responseTimestamp: currentDateTime,
            nativeMsgId: Helpers.generateGUID(),
            clientIntegrationId: "HYT0003"
          }
        }
      };
    
    
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


