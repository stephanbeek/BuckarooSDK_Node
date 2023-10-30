import buckarooClientTest from '../BuckarooClient.test';
import Paypal from '../../src/PaymentMethods/Paypal';
import { uniqid } from '../../src/Utils/Functions';

const method = new Paypal('paypal');

describe('Paypal', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 100,
            })
            .then((info) => {
                expect(info.data).toBeDefined();
            });
    });
    test('Refund', async () => {
        await method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((info) => {
                expect(info.data).toBeDefined();
            });
    });
    test('ExtraInfo', async () => {
        buckarooClientTest.method('subscriptions').createCombined({});
        await method
            .extraInfo({
                amountDebit: 100,
                address: {
                    street: 'Hoofdstraat',
                    street2: 'Street 2',
                    city: 'Heerenveen',
                    state: 'Friesland',
                    zipcode: '8441ER',
                    country: 'NL',
                },
                addressOverride: false,
                customer: { name: 'Test Acceptatie' },
                noShipping: '0',
                phone: { mobile: '0612345678' },
            })
            .then((info) => {
                expect(info.data).toBeDefined();
            });
    });
});
