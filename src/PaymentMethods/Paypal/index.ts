import { PayablePaymentMethod } from '../../Services';
import { IPaymentRequest, IRefundRequest } from '../../Models';
import { IPay, Pay } from './Models/Pay';
import { ExtraInfo, IExtraInfo } from './Models/ExtraInfo';
import { ServiceCode } from '../../Utils';

export default class Paypal extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'paypal';
    }

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }

    payRecurrent(payload: IPaymentRequest) {
        this.setPayPayload(payload);
        this.setServiceList('PayRecurring');
        return super.transactionRequest(payload);
    }

    extraInfo(payload: IExtraInfo) {
        this.setPayPayload(payload);
        this.setServiceList('Pay,ExtraInfo', new ExtraInfo(payload));
        return super.transactionRequest(payload);
    }
}
