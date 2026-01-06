export const transactionQueries = {
    getTransactionByCorrelationId: `
      SELECT *
      FROM transactions
      WHERE client_correlation_id = $1
    `,
  
    getWorkflowById: `
      SELECT *
      FROM workflows
      WHERE workflow_id = $1
    `
  };
  