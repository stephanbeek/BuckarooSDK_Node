import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('boekenbon');

describe('GiftCard methods', () => {
    test('Pay', async () => {
        const responsePay = await method
            .pay({
                amountDebit: 100,
                intersolveCardnumber: '0000000000000000001',
                intersolvePIN: '1000',
            })
            .request();
        expect(responsePay.isSuccess()).toBeTruthy();
        const responseRemainderPay = await buckarooClientTest
            .method('ideal')
            .payRemainder({
                amountDebit: 100,
                issuer: 'ABNANL2A',
                invoice: responsePay.data.invoice,
                originalTransactionKey: responsePay.data.relatedTransactions[0].relatedTransactionKey,
            })
            .request();
        expect(responseRemainderPay.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        return method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                email: 'test@buckaroo.nl',
                lastName: 'Acceptatie',
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeTruthy();
            });
    });
});
