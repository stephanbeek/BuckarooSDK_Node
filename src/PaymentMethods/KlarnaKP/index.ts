import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IPay, Pay } from './Models/IPay';
import IRequest from '../../Models/IRequest';
import { IReserve, Reserve } from './Models/IReserve';
import { ServiceCode } from '../../Utils';

export default class KlarnaKP<
    Code extends 'klarnakp',
    Manually extends boolean = false
> extends PayablePaymentMethod<Code, Manually> {
    protected _paymentName = 'KlarnaKP';
    protected _serviceVersion = 1;

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    reserve(payload: IReserve) {
        this.setServiceList('Reserve', new Reserve(payload));
        return this.dataRequest(payload);
    }

    cancel(payload: IRequest) {
        this.setServiceList('CancelReservation', new Pay(payload));
        return this.dataRequest(payload);
    }

    update(payload: IRequest) {
        this.setServiceList('UpdateReservation');
        return this.dataRequest(payload);
    }

    extend(payload: IRequest) {
        this.setServiceList('ExtendReservation');
        return this.dataRequest(payload);
    }

    addShippingInfo(payload: IRequest) {
        this.setServiceList('AddShippingInfo');
        return this.dataRequest(payload);
    }
}
