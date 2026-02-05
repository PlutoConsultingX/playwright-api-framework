import { TransactionFactory } from '../factories/transactionFactory.js';
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
    console.log("API Validation Response Status:", response.status());
    console.log("API Validation Response Body:", JSON.stringify(responseBody, null, 2));

    return response;
  }



  //----------Processed EFT Payment Request ----------
  /*
  async processedToBankSalary({ senderMessageIdFromCallback, transactionIdFromCallback, nativeTransactionIdFromCallback }) {
    if (!ENV.LOAD_CREATED_URL) {
      throw new Error("ENV.LOAD_CREATED_URL is not defined");
    }


    const payloadProcessedToBank = {
      Response: {
        ISInfo: {
          serviceId: "FACS-EFT-TRANSACTION-01",
          responseId: "{{$guid}}",
          isCorrelationId: "c5919c23-a691-4cc8-a3fe-b918b9c04f94",
          senderMessageId: senderMessageIdFromCallback
        },
        responseDetail: {
          transactions: [
            {
              transactionId: transactionIdFromCallback,
              actionDate: Helpers.getCurrentDate(),
              actionDate: Helpers.getCurrentDate(),
              nativeTransactionId: nativeTransactionIdFromCallback,
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
    };
    console.log("Processed To Bank Payload:", JSON.stringify(payloadProcessedToBank, null, 2));

    const response = await this.request.post(ENV.LOAD_CREATED_URL, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "sag-correlation-id": Helpers.generateGUID()
      },
      data: payloadProcessedToBank
    });

    console.log("Processed to bank Status:", response.status());
    console.log("Processed to bank Response:", await response.text());

    return response;

  }
*/
  /**
   * @typedef {Object} LoadCreatedSalaryParams
   * @property {string} transactionId
   * @property {string} senderMessageId
   * @property {string} nativeTransactionId
   */
  /*
  async loadCreatedSalary({
    transactionId,
    senderMessageId,
    nativeTransactionId,
  }) {
  
    if (!ENV.LOAD_CREATED_URL) {
      throw new Error('ENV.LOAD_CREATED_URL is not defined');
    }
  
    console.log('This is the Load Created URL:', ENV.LOAD_CREATED_URL);
  
    const payloadLoadCreated = {
      Response: {
        ISInfo: {
          serviceId: 'FACS-SALARYDAY-TRANSACTION-01',
          responseId: Helpers.generateGUID(),
          isCorrelationId: Helpers.generateGUID(),
          senderMessageId,
        },
        responseDetail: {
          transactions: [
            {
              transactionId,
              actionDate: Helpers.getCurrentDate(),
              effectiveDate: Helpers.getCurrentDate(),
              serviceType: 'EFTPAYMENT',
              nativeTransactionId : TransactionFactory.nativeTransactionId,
              transactionError: {
                errorCode: '',
                errorDescription: '',
              },
              transactionAmount: '100',
              transactionResponse: {
                responseType: 'CREATED',
                responseDescription: 'Transaction created',
              },
            },
          ],
        },
        responseHeader: {
          totalCount: 1,
          responseCode: 'PROCESSED',
          responseType: 'LOAD',
          clientProfile: 'FACHYTQ1',
          responseTimestamp: Helpers.getCurrentDate(),
          nativeMsgId: Helpers.generateGUID(),
          clientIntegrationId: 'HYT0002',
        },
      },
    };
  
    console.log("Load Created Payload from UserClient.js :", JSON.stringify(payloadLoadCreated, null, 2));
  
    const response = await this.request.post(ENV.LOAD_CREATED_URL, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "sag-correlation-id": Helpers.generateGUID()
      },
      data: payloadLoadCreated
    });
  
    console.log("Load Created Status:", response.status());
    console.log("Load Created Response:", await response.text());
  
    return response;
  }
*/
  async loadCreatedSalary(body) {
    if (!ENV.LOAD_CREATED_URL) {
      throw new Error('ENV.LOAD_CREATED_URL is not defined');
    }

    console.log('Sending Load Created Body:', JSON.stringify(body, null, 2)
    );

    return this.request.post(ENV.LOAD_CREATED_URL, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'sag-correlation-id': Helpers.generateGUID(),
      },
      data: body,
    });
  }

  async processedToBankSalary(body) {
    if (!ENV.PROCESSED_TO_BANK_URL) {
      throw new Error('ENV.PROCESSED_TO_BANK_URL is not defined');
    }

    console.log('Sending processed to bank Body:', JSON.stringify(body, null, 2)
    );

    return this.request.post(ENV.PROCESSED_TO_BANK_URL, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'sag-correlation-id': Helpers.generateGUID(),
      },
      data: body,
    });
  }
  async cashedSalary(body) {
    if (!ENV.CASHED_URL) {
      throw new Error('ENV.CASHED_URL is not defined');
    }

    console.log('Sending Cashed Body:', JSON.stringify(body, null, 2)
    );

    return this.request.post(ENV.CASHED_URL, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'sag-correlation-id': Helpers.generateGUID(),
      },
      data: body,
    });
  }
}

