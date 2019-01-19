"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
/**
 * This class converts the data retrieved by the API
 * into an easy-to-process format and returns it.
 */
class NomicsNode {
    constructor({ apiKey }) {
        this.api = new index_1.default({ apiKey });
    }
    /**
     * Get currencies with a single Array.
     * [ '0XBTC',
     *   '1ST',
     *   '2GIVE',
     *   '3DES',
     *   ...
     */
    async currenciesArray() {
        const currencies = await this.api.currencies();
        return currencies.map((value) => {
            return value.id;
        });
    }
    /**
     * Get price with a single object.
     *
     *
     * { _1ST: 0.02829,
     *   _2GIVE: 0.00138,
     *   ABA: 0.01547,
     *   ABT: 0.07469,
     *   ABTC: 0.13559,
     *   ABY: 0.00124,
     *   ABYSS: 0.00632,
     *   ...
     */
    async pricesObject() {
        const pricesArray = await this.api.prices();
        const pricesObject = pricesArray.reduce((previousValue, currentValue) => {
            const currencyName = /^[_A-Za-z]/.test(currentValue.currency)
                ? currentValue.currency
                : "_" + currentValue.currency;
            return Object.assign({}, previousValue, { [currencyName]: Number(currentValue.price) });
            // @ts-ignore
        }, {});
        return pricesObject;
    }
    /**
     * Get exchangeRates with a single object.
     *
     * {
     *  USD:
     *  { currency: 'USD',
     *    rate: 1,
     *    timestamp: '2019-01-16T00:00:00Z' },
     *  EUR:
     *  { currency: 'EUR',
     *    rate: 1.14142,
     *    timestamp: '2019-01-16T00:00:00Z' },
     *  JPY:
     *  { currency: 'JPY',
     *    rate: 0.0092,
     *    timestamp: '2019-01-16T00:00:00Z' },
     *  ...
     */
    async exchangeRatesObject() {
        const ratesArray = await this.api.exchangeRates();
        // @ts-ignore
        const ratesObject = ratesArray.reduce((previousValue, currentValue) => {
            return Object.assign({}, previousValue, { [currentValue.currency]: {
                    currency: currentValue.currency,
                    rate: Number(currentValue.rate),
                    timestamp: currentValue.timestamp,
                } });
        }, {});
        return ratesObject;
    }
    /** Dashboard version of the pricesObject method. */
    async dashboardObject() {
        const dashboard = await this.api.dashboard();
        const dashboardObject = dashboard.reduce((previousValue, currentValue) => {
            /** Change the key name for easy handling in GraphQL */
            const currencyName = /^[_A-Za-z]/.test(currentValue.currency)
                ? currentValue.currency
                : "_" + currentValue.currency;
            const numberObj = Object.entries(currentValue).reduce((pValue, cValue) => {
                const value = ["currency", "highTimestamp", "highExchange", "highQuoteCurrency"].includes(cValue[0])
                    ? cValue[1]
                    : Number(cValue[1]);
                return Object.assign({}, pValue, { [cValue[0]]: value });
            }, {});
            return Object.assign({}, previousValue, { [currencyName]: numberObj });
            // @ts-ignore
        }, {});
        return dashboardObject;
    }
    /**
     * Get currenciesInterval with a single object.
     *
     * {
     *  BTC:
     *  { currency: 'BTC',
     *    volume: 4887265624.18739,
     *    open: 3650.91796,
     *    open_timestamp: '2019-01-13T00:00:00Z',
     *    close: 3770.37047,
     *    close_timestamp: '2019-01-19T00:00:00Z' },
     *  ETH:
     *  { currency: 'ETH',
     *    volume: 2011702447.65631,
     *  ...
     */
    async currenciesIntervalObject({ startISOString, endISOString }) {
        const currenciesInterval = await this.api.currenciesInterval({ startISOString, endISOString });
        const currenciesIntervalObject = currenciesInterval.reduce((previousValue, currentValue) => {
            /** Change the key name for easy handling in GraphQL */
            const currencyName = /^[_A-Za-z]/.test(currentValue.currency)
                ? currentValue.currency
                : "_" + currentValue.currency;
            const numberObj = Object.entries(currentValue).reduce((pValue, cValue) => {
                const value = ["currency", "open_timestamp", "close_timestamp"].includes(cValue[0])
                    ? cValue[1]
                    : Number(cValue[1]);
                return Object.assign({}, pValue, { [cValue[0]]: value });
            }, {});
            return Object.assign({}, previousValue, { [currencyName]: numberObj });
            // @ts-ignore
        }, {});
        return currenciesIntervalObject;
    }
    currenciesInterval24h() {
        const yesterday = (new Date(Date.now() - (86400 * 1000))).toISOString().split(".")[0] + "Z";
        return this.currenciesIntervalObject({ startISOString: yesterday });
    }
}
exports.NomicsNode = NomicsNode;
