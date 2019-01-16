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
}
exports.NomicsNode = NomicsNode;
