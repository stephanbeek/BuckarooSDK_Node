import { DataRequestData, Request } from '../Request';
import { HttpMethods, RequestTypes } from '../Constants';
import { ITransactionResponse, ServiceList, TransactionResponse } from '../Models';

export interface IActiveSubscription {
    serviceCode: string;
    currencies: string[];
}

export default class ActiveSubscriptions extends Request<typeof TransactionResponse, DataRequestData> {
    private readonly _serviceCode: string = 'GetActiveSubscriptions';

    constructor() {
        super(RequestTypes.Data, HttpMethods.POST, new DataRequestData(), TransactionResponse);
    }
    async get() {
        this.data.setServiceList(
            new ServiceList({
                name: this._serviceCode,
                version: 1,
                action: this._serviceCode,
            })
        );
        return this.request().then((response) => {
            return this.format(response.data);
        });
    }
    private format(data: ITransactionResponse) {
        let activeSubscriptions: IActiveSubscription[] = [];
        const xmlData = data.services?.[0].parameters[0].value;
        if (typeof xmlData === 'string') {
            let parseString = require('xml2js').parseString;

            parseString(xmlData, function (err: any, result: Record<string, any>) {
                activeSubscriptions = result['ArrayOfServiceCurrencies']['ServiceCurrencies'].map((service: any) => {
                    return {
                        serviceCode: service['ServiceCode'][0],
                        currencies: service['Currencies'][0]['string'],
                    };
                });
            });
        }
        return activeSubscriptions;
    }
}
