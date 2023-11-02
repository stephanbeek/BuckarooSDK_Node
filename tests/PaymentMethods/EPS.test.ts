import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('eps');
describe('Testing Eps methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 100,
            })
            .then((response) => {
                expect(response.isSuccess()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((response) => {
                expect(response.isFailed()).toBeTruthy();
            });
    });
});
