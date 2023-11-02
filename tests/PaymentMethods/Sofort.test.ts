import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('sofortueberweisung');

describe('Sofort', () => {
    test('Pay', async () => {
        return await method
            .pay({
                amountDebit: 100,
                order: uniqid(),
            })
            .then((info) => {
                expect(info).toBeDefined();
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
                expect(info).toBeDefined();
            });
    });

    test('InstantRefund', async () => {
        await method
            .instantRefund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
});
