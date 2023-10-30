import Gender from '../../src/Constants/Gender';
import buckarooClientTest from '../BuckarooClient.test';

const method = buckarooClientTest.method('transfer');

describe('Transfer methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 100,
                customer: {
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                    gender: Gender.MALE,
                },
                email: 'test@buckaroo.nl',
                sendMail: true,
                dateDue: '2024-10-10',
            })
            .then((res) => {
                expect(res.isAwaitingConsumer()).toBeDefined();
            });
    });
});
