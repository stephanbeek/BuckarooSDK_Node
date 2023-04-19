import { AdditionalParameter, IPAddress } from '../Utils/Types'

export declare interface ITransaction {
    clientIP?: string | IPAddress
    currency?: string
    returnURL?: string
    returnURLError?: string
    returnURLCancel?: string
    returnURLReject?: string
    pushURL?: string
    pushURLFailure?: string
    invoice?: string
    order?: string
    amountDebit?: number
    amountCredit?: number
    description?: string
    originalTransactionKey?: string
    originalTransactionReference?: string
    culture?: string
    startRecurrent?: boolean
    /**
     * 0 = No
     * 1 = RedirectToHTML
     */
    continueOnIncomplete?: 0 | 1
    servicesSelectableByClient?: string
    servicesExcludedForClient?: string
    customParameters?: AdditionalParameter
    additionalParameters?: AdditionalParameter
}

export declare interface Payload extends Omit<ITransaction, 'amountCredit'> {
    invoice?: string
    order?: string
    amountDebit: number
}

export declare interface RefundPayload extends Omit<ITransaction, 'amountDebit'> {
    order?: string
    amountCredit: number
    originalTransactionKey: string
}
export declare interface ICapture extends Payload {
    originalTransactionKey: string
}