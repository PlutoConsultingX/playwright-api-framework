import { Helpers } from '../utils/helpers.js';

export class TransactionFactory {
  static createTransactionPayload() {
    return {
      workflowID: "WF123456",
      clientCorrelationID: Helpers.generateGUID(),
      requestDate: `${Helpers.getCurrentDate()}${Helpers.getCurrentTime()}`,
      totalCount: 1,
      transactions: [
        {
          transactionID: Helpers.generateGUID(),
          transactionAmount: 300,
          actionDate: Helpers.getActionDate(),
          subjectReference: "SREF000-06052025",
          clientReference: "CREF000-06052025",
          mandateReference: "00032024091612QRZ2ZDWW",
          contractReference: "Molly222",
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
            firstName: "john",
            lastName: "doe",
            phoneNumber: "+27721234567",
            emailAddress: "Hyphen@RMB.com",
            profileReference: Helpers.randomFirstName()
          }
        }
      ]
    };
  }
}
