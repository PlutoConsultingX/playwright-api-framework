import { Helpers } from '../utils/helpers.js';

export class TransactionFactory {
  static createTransactionPayload() {
    return {
      workflowID: "99590d04-add1-4f6f-b025-61ecb93b82a6",
      clientCorrelationID: Helpers.generateGUID(),
      requestDate:Helpers.getExactFormatCurrentDateTime(),
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
  static loadCreatedEFTPayload() {
    return {
      Response: {
        ISInfo: {
          serviceId: "FACS-SALARYDAY-TRANSACTION-01",
          responseId: "{{$guid}}",
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
