import { TransactionStatus } from '@usedapp/core';

const INVALID_INPUT_ERROR = 'value out-of-bounds';
const CONTRACT_ERROR = 'The execution failed due to an exception.';
const USER_REJECTED_ERROR = 'MetaMask Tx Signature: User denied transaction signature.';

export const getTransactionStatusMessage = (transactionStatus: TransactionStatus): string => {
    if (!transactionStatus?.status) {
        return 'Unknown error occurred';
    }
    switch (transactionStatus.status) {
        case 'None':
            return 'No active transaction';
        case 'PendingSignature':
            return 'Please approve transaction in your wallet';
        case 'Mining':
            return 'Submitted, waiting for confirmation';
        case 'Success':
            return 'Transaction submitted!';
        case 'Fail':
            return 'Transaction failed. Check the transaction for further details or reach out for support on Telegram'; // TODO: add error message
        case 'Exception':
            if (transactionStatus.errorMessage === INVALID_INPUT_ERROR) {
                return 'Tx failed due to invalid input. Please try resubmitting or reach out for support on Telegram';
            } else if (transactionStatus.errorMessage === CONTRACT_ERROR) {
                return "Tx failed due to contract validation. Various reasons for this which we don't get notified of. Please reach out for support on Telegram.";
            } else if (transactionStatus.errorMessage === USER_REJECTED_ERROR) {
                return 'You rejected the tx';
            }
        default:
            return "Unknown error occurred... please check your RPC and try again. If it's not resolved, reach out to us on Telegram";
    }
};

export const didUserRejectTransaction = (transactionStatus: TransactionStatus): boolean => {
    return (
        transactionStatus.status === 'Exception' &&
        transactionStatus.errorMessage === USER_REJECTED_ERROR
    );
};
