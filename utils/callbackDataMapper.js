export class CallbackDataMapper {
  static fromDbRow(dbRow) {
    if (!dbRow?.callback_data) {
      throw new Error("DB row does not contain callback_data");
    }

    let parsed;
    try {
      parsed = JSON.parse(dbRow.callback_data);
    } catch (err) {
      throw new Error(
        `Failed to parse callback_data JSON: ${err.message}\nRaw:\n${dbRow.callback_data}`
      );
    }

    const transaction =
      parsed?.responseDetail?.transactions?.[0];

    return {
      senderMessageId: parsed?.isInfo?.senderMessageId,
      isCorrelationId: parsed?.isInfo?.isCorrelationId,
      responseId: parsed?.isInfo?.responseId,
      serviceId: parsed?.isInfo?.serviceId,

      transactionId: transaction?.transactionId,
      nativeTransactionId: transaction?.nativeTransactionId,
      transactionAmount: transaction?.transactionAmount,
      serviceType: transaction?.serviceType,
      actionDate: transaction?.actionDate,
      effectiveDate: transaction?.effectiveDate,

      raw: parsed
    };
  }
}
