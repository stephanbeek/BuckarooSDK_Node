import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('noservice');

describe('NoService methods', () => {
    test('Pay', async () => {
        return method
            .pay({
                amountDebit: 100,
                invoice: uniqid(),
                servicesSelectableByClient: 'ideal,bancontactmrcash,paypal',
                servicesExcludedForClient: 'ideal',
                continueOnIncomplete: true,
            })
            .request()
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy();
            });
    });
});
