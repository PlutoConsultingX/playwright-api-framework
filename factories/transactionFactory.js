import { Helpers } from '../utils/helpers.js';

export class TransactionFactory {

  static createTransactionPayload() {
    return {
      workflowID: "99590d04-add1-4f6f-b025-61ecb93b82a6",
      clientCorrelationID: Helpers.generateGUID(),
      requestDate: Helpers.getExactFormatCurrentDateTime(),
      totalCount: 1,
      transactions: [
        {
          transactionID: Helpers.generateGUID(),
          transactionAmount: 300,
          actionDate: Helpers.getActionDate(),
          subjectReference: "SREF000-06052025",
          clientReference: "CREF000-06052025",
          mandateReference: "00032024091612QRZ2ZDWW",
          contractReference: "",
          trackingDays: 10,
          collectionReoccurance: "OOFF",
          subjectDetails: {
            accountNumber: "62006677069",
            accountType: "02",
            branchCode: "250655",
            country: "ZAF",
            idType: "SouthAfricanID",
            idValue: "5010207660089",
            initials: "SK",
            firstName: "Thato",
            lastName: "Automation",
            phoneNumber: "+27721234567",
            emailAddress: "Hyphen@RMB.com",
            profileReference: Helpers.randomFirstName()
          }
        }
      ]
    };
  }
  /*
  static loadCreatedEFTPayload({ transactionId, senderMessageId,nativeTransactionId }) {
    
    return {
      Response: {
        ISInfo: {
          serviceId: "FACS-SALARYDAY-TRANSACTION-01",
          responseId: "{{$guid}}",
          isCorrelationId: "4332489f-7273-4f93-b989-53436a1277ab",
          senderMessageId
        },
        responseDetail: {
          transactions: [
            {
              transactionId,
              actionDate: Helpers.getCurrentDate(),
              //nativeTransactionId: "P926 -EF-000000151-00000100",
              nativeTransactionId,
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
          nativeMsgId: "{{$guid}}",
          clientIntegrationId: "HYT0002"
        }
      }
    };
  }
 */

  static loadCreatedSalaryPayload({ transactionId, senderMessageId, nativeTransactionId, correlationId }) {
    if (!transactionId || !senderMessageId) {
      throw new Error("transactionId or senderMessageId is missing for Load Created payload");
    }
  
    return {
      Response: {
        ISInfo: {
          serviceId: "FACS-SALARYDAY-TRANSACTION-01",
          responseId: Helpers.generateGUID(),
          isCorrelationId: correlationId || "4332489f-7273-4f93-b989-53436a1277ab",
          senderMessageId
        },
        responseDetail: {
          transactions: [
            {
              transactionId,
              actionDate: Helpers.getCurrentDate(),
              effectiveDate: Helpers.getCurrentDate(),
              serviceType: "EFTPAYMENT",
              nativeTransactionId: nativeTransactionId || Helpers.generateNextNativeTransactionId("P926 -EF-000000151-00000100"),
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
          responseTimestamp: Helpers.responseTimestamp(),
          nativeMsgId: Helpers.generateGUID(),
          clientIntegrationId: "HYT0002"
        }
      }
    };
  }
  
  static processedToBankPayload({ senderMessageId, transactionId, nativeTransactionId, correlationId }) {
    return {
      Response: {
        ISInfo: {
          serviceId: "FACS-SALARYDAY-TRANSACTION-01",
          responseId: Helpers.generateGUID(),
          isCorrelationId: correlationId || "c5919c23-a691-4cc8-a3fe-b918b9c04f94",
          senderMessageId
        },
        responseDetail: {
          transactions: [
            {
              transactionId,
              actionDate: Helpers.getCurrentDate(),
              effectiveDate: Helpers.getCurrentDate(),
              nativeTransactionId,
              serviceType: "EFTPAYMENT",
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
          responseTimestamp: Helpers.responseTimestamp(),
          nativeMsgId: "11049bd1-5fea-4bb2-b97e-0afa064ac82a",
          clientIntegrationId: "HYT0002"
        }
      }
    };

  }
  static CashedPayload({ senderMessageId, transactionId, nativeTransactionId, correlationId }) {
    return {
      Response: {
        ISInfo: {
          serviceId: "FACS-SALARYDAY-TRANSACTION-01",
          responseId: Helpers.generateGUID(),
          isCorrelationId: correlationId || "c5919c23-a691-4cc8-a3fe-b918b9c04f94",
          senderMessageId
        },
        responseDetail: {
          transactions: [
            {
              transactionId,
              actionDate: Helpers.getCurrentDate(),
              effectiveDate: Helpers.getCurrentDate(),
              nativeTransactionId,
              serviceType: "EFTPAYMENT",
              transactionError: {
                errorCode: "",
                errorDescription: ""
              },
              transactionAmount: "100",
              transactionResponse: {
                responseType: "CASHED",
                responseDescription: "Transaction successful"
              }
            }
          ]
        },
        responseHeader: {
          totalCount: 1, 
          responseCode: "PROCESSED",
          responseType: "RESPONSE",
          clientProfile: "FACHYTQ1",
          responseTimestamp: Helpers.responseTimestamp(),
          nativeMsgId: "11049bd1-5fea-4bb2-b97e-0afa064ac82a",
          clientIntegrationId: "HYT0002"
        }
      }
    };

  }
}

