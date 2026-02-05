export const loadCreatedQuery = {
    getSalaryTransactionFailedSAGResponsePostLoadCreatedMock: `
    SELECT t.workflow_execution_id,t.transaction_id 
    ,ti.client_transaction_id ,ti.transaction_item_id 
    ,tidr.child_workflow_execution_id 
    ,ts.transaction_status_name as trxBatchStatus,tis.transaction_item_status_name as trxStatus,tids.transaction_item_detail_status_name as trxItemDetailStatus
 
    ,s.service_name ,tid.transaction_item_detail_id 
    ,tidrs.transaction_item_detail_run_status_name 
    ,tidr.response_manager_code ,tidr.response_manager_exception_type ,tidr.response_manager_message,tidr.response_data 
    ,et.response_reference ,et.request_payload_data as sagrequestpayload,et.transaction_id as senderID,et.transaction_run_detail_id as transactionIDSAGReqPayload,et.response_payload_data ,et.response_type,et.transaction_status as workertransactionstatus
 
    ,ewr.response_code as sagTransresponsecode,ewr.response_description as sagTransresponse_description,ewr.error_code as sagTranserrorcode,ewr.error_description as sagTranserror_description,ewr.callback_data
 
    from transaction t 
    INNer Join transaction_status ts on t.transaction_status_id = ts.transaction_status_id 
    INNER Join transaction_item ti on t.transaction_id = ti.transaction_id 
    INNER Join transaction_item_status tis on ti.transaction_item_status_id = tis.transaction_item_status_id 
    INNER JOIN transaction_item_detail tid on ti.transaction_item_id = tid.transaction_item_id 
    INNER JOIN service s on tid.service_id = s.service_id 
    INNER JOIN transaction_item_detail_status tids on tid.transaction_item_detail_status_id = tids.transaction_item_detail_status_id 
    INNER JOIN transaction_item_detail_run tidr on tidr.transaction_item_detail_id = tid.transaction_item_detail_id 
    INNER JOIN transaction_item_detail_run_status tidrs on tidr.transaction_item_detail_run_status_id = tidrs.transaction_item_detail_run_status_id 
    INNER JOIN WORKFLOW_WORKER_EFT_PAYMENTS_SALARYDAY.salaryday_eft_payment_transaction et on et.transaction_run_detail_id = tidr.transaction_item_detail_run_id 
    INNER JOIN WORKFLOW_WORKER_EFT_PAYMENTS_SALARYDAY.salaryday_eft_payment_worker_responses ewr on ewr.transaction_id = et.transaction_id 
    
    WHERE t.client_message_id = ?
  `
  };