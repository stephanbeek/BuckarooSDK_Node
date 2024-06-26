import { IPaymentRequest, IPerson, Person, ServiceParameter } from '../../../Models';

export interface IPay extends IPaymentRequest {
    email: string;
    customer: Partial<IPerson>;
}

export class Pay extends ServiceParameter {
    set email(email: string) {
        this.set('customerEmail', email);
    }

    set customer(customer: Partial<IPerson>) {
        this.set('customer', new Customer(customer));
    }
}

export class Customer extends Person {
    set firstName(email: string) {
        this.set('customerFirstName', email);
    }

    set lastName(email: string) {
        this.set('customerLastName', email);
    }
}
