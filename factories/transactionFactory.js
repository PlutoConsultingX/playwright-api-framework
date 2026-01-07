import { Helpers } from '../utils/helpers.js';

export class TransactionFactory {
  static createTransactionPayload() {
    return {
      workflowID: "99590d04-add1-4f6f-b025-61ecb93b82a6",
      clientCorrelationID: Helpers.generateGUID(),
      requestDate: "2026-01-05T08:13",
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
}
