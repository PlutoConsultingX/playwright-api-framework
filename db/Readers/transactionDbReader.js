import { DbClient } from "../dbClient.js";
import { transactionQueries } from "../queries/transactionQueries.js";

export class TransactionDbReader {
  constructor(dbClient = new DbClient()) {
    this.dbClient = dbClient;
  }

  /**
   * Polls DB until transaction record is found or timeout occurs
   */
  async getTransactionByCorrelationId(
    correlationId,
    { maxRetries = 10, delayMs = 1000 } = {}
  ) {
    let result = [];

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      result = await this.dbClient.query(
        transactionQueries.getSalaryTransactionFailedSAGResponse,
        [correlationId]
      );

      if (result.length > 0) {
        return result[0]; // return first matched row
      }

      console.log(
        `Waiting for DB record (correlationId=${correlationId})... (${attempt}/${maxRetries})`
      );
      await new Promise((res) => setTimeout(res, delayMs));
    }

    throw new Error(
      `Transaction not found in DB after ${maxRetries} retries (correlationId=${correlationId})`
    );
  }

  /**
   * Extracts required identifiers from DB row
   */
  extractIdentifiers(dbRow) {
    return {
      senderID: dbRow.sender_id,
      transactionIDSAGReqPayload: dbRow.transaction_id_sag_req_payload,
    };
  }
}
