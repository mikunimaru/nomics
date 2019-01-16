"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (fetch === undefined) {
    // tslint:disable
    // @ts-ignore
    var fetch = require("node-fetch");
}
var nomicsNode_1 = require("./nomicsNode");
exports.NomicsNode = nomicsNode_1.NomicsNode;
// tslint:enable
class Nomics {
    constructor({ apiKey }) {
        this.apiKey = "2018-09-demo-dont-deploy-b69315e440beb145";
        apiKey ? this.apiKey = apiKey
            : console.log("The nomics class was initialized in demo mode.");
    }
    ////  Currencies ////
    /** The currencies endpoint returns all the currencies that Nomics supports. */
    currencies() {
        return this.getCurrenciesV1()
            .catch((err) => {
            console.error("Error in 'currencies' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    /**
     * The prices endpoint returns current prices for all currencies.
     * Prices are updated every 10 seconds.
     */
    prices() {
        return this.getPricesV1()
            .catch((err) => {
            console.error("Error in 'prices' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    /** Open and close prices and volume for all currencies between a customizable time range. */
    currenciesInterval({ startISOString, endISOString }) {
        return this.getCurrenciesIntervalV1({ startISOString, endISOString })
            .catch((err) => {
            console.error("Error in 'currenciesInterval' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    /**
     * The currencies sparkline endpoint returns prices for all currencies within a
     * customizable time interval suitable for sparkline charts.
     *
     * Note: the timestamps and prices are built off of OHLCV
     * candles using the close price. This means that the timestamp
     * represents the start of the candle, and the price is the close
     * price of that candle. This means the response's final timestamp
     * and price value are always as current as possible, but also
     * that the price is effectively "off" by one candle.
     * This endpoint is designed to serve as a convenient way
     * to render sparklines, if you need exactly aligned
     * times and prices you can use the Aggregated OHLCV Candles endpoint.
     */
    currenciesSparkline({ startISOString, endISOString }) {
        return this.getCurrenciesSparklineV1({ startISOString, endISOString })
            .catch((err) => {
            console.error("Error in 'currenciesSparkline' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    /** Open and close supply information for all currencies between a customizable time interval. */
    suppliesInterval({ startISOString, endISOString }) {
        return this.getSuppliesIntervalV1({ startISOString, endISOString })
            .catch((err) => {
            console.error("Error in 'suppliesInterval' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    /** Returns all time high information for all currencies. */
    allTimeHighs() {
        return this.getAllTimeHighsV1()
            .catch((err) => {
            console.error("Error in 'allTimeHigh' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    //// Markets ////
    /**
     * The markets endpoint returns information on the exchanges and markets that
     * Nomics supports, in addition to the Nomics currency identifiers for the
     * base and quote currency.
     */
    markets({ exchange, base, quote }) {
        return this.getMarketsV1({ exchange, base, quote })
            .catch((err) => {
            console.error("Error in 'markets' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    /**
     * The market prices endpoint returns prices in USD for
     * the last trade in each market with the given base currency.
     */
    marketPrices({ nomicsCurrencyID }) {
        return this.getMarketPricesV1({ nomicsCurrencyID })
            .catch((err) => {
            console.error("Error in 'marketPrices' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    /**
     * The market interval endpoint returns a summary of information about all
     * markets based in a given currency over a configurable time interval.
     */
    marketInterval({ nomicsCurrencyID, hours, startISOString, endISOString }) {
        return this.getMarketIntervalV1({ nomicsCurrencyID, hours, startISOString, endISOString })
            .catch((err) => {
            console.error("Error in 'marketInterval' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    /** The exchange market prices endpoint returns prices for the last trade in each market */
    exchangeMarketPrices({ nomicsCurrencyID, exchange }) {
        return this.getExchangeMarketPricesV1({ nomicsCurrencyID, exchange })
            .catch((err) => {
            console.error("Error in 'exchangeMarketPrices' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    /**
     * The exchange market interval endpoint returns a summary of information about
     * all markets over a configurable time interval in their native values.
     */
    exchangeMarketInterval({ nomicsCurrencyID, exchange, startISOString, endISOString }) {
        return this.getExchangeMarketIntervalV1({ nomicsCurrencyID, exchange, startISOString, endISOString })
            .catch((err) => {
            console.error("Error in 'exchangeMarketInterval' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    /**
     * MarketCap History is the total market cap for
     * all cryptoassets at intervals between the requested time period.
     */
    marketCapHistory({ startISOString, endISOString }) {
        return this.getMarketCapHistoryV1({ startISOString, endISOString })
            .catch((err) => {
            console.error("Error in 'marketCapHistory' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    /**
     * The dashboard endpoint is a high level view of the current state of the
     * market. It contains a wide variety of information and is updated every 10 seconds.
     */
    dashboard() {
        return this.getDashboardV1()
            .catch((err) => {
            console.error("Error in 'marketCapHistory' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    //// Candles ////
    /**
     * The candles endpoint returns aggregated open, high, low, close, and volume
     * information for Nomics currencies. When asking for candles, a currency is
     * provided as a parameter. Nomics aggregates all markets where the given currency
     * is the base currency and the quote currency is a fiat currency, BTC, or ETH and
     * returns all values in USD.
     *
     * Candles are aggregated across all markets for the base currencies, which
     * necessitates converting to a common quote currency. Nomics converts all
     * markets into USD in order to aggregated candles.
     *
     * Candles have the following history based on size:
     *
     * 1d: Inception
     * 1h: 30 days
     */
    aggregatedOHLCVCandles({ interval, nomicsCurrencyID, startISOString, endISOString }) {
        return this.getAggregatedOHLCVCandlesV1({ interval, nomicsCurrencyID, startISOString, endISOString })
            .catch((err) => {
            console.error("Error in 'aggregatedOHLCVCandles' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    /**
     * The exchange candles endpoint returns raw open, close, high, low, and volume
     * information for Nomics Markets. The data is not aggregated, therefore prices
     * are in the quote currency of the market and volume is in the base currency of the market.
     *
     * Candles have the following history based on size:
     *
     * 1d: Inception
     * 4h: 120 days
     * 1h: 30 days
     * 30m: 14 days
     * 5m: 3 days
     * 1m: 24 hours
     */
    exchangeOHLCVCandles({ interval, exchange, market, startISOString, endISOString }) {
        return this.getExchangeOHLCVCandlesV1({ interval, exchange, market, startISOString, endISOString })
            .catch((err) => {
            console.error("Error in 'exchangeOHLCVCandles' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    //// Volume ////
    /**
     * Volume History is the total volume for all cryptoassets
     * in USD at intervals between the requested time period.
     */
    globalVolumeHistory({ startISOString, endISOString }) {
        return this.getGlobalVolumeHistoryV1({ startISOString, endISOString })
            .catch((err) => {
            console.error("Error in 'globalVolumeHistory' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    //// Exchange Rates ////
    /**
     * The exchange rates endpoint returns the current exchange rates used by Nomics
     * to convert prices from markets into USD. This contains Fiat currencies as well
     * as a BTC and ETH quote prices. This endpoint helps normalize data across markets
     * as well as to provide localization for users.
     *
     * Currently, this endpoint does not support historical data, but this feature is planned.
     */
    exchangeRates() {
        return this.getExchangeRatesV1()
            .catch((err) => {
            console.error("Error in 'exchangeRates' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    /**
     * Exchange rates for every point in a time range. This endpoint can be
     * used with other interval endpoints to convert values into a desired quote currency.
     *
     * The currency parameter must be a Nomics Quote Currency, to get all Nomics Quote
     * Currencies, use the /exchange-rates endpoint for all current rates.
     */
    exchangeRatesHistory({ nomicsCurrencyID, startISOString, endISOString }) {
        return this.getExchangeRatesHistoryV1({ nomicsCurrencyID, startISOString, endISOString })
            .catch((err) => {
            console.error("Error in 'exchangeRatesHistory' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    /**
     * Exchange rates to convert from USD over a time interval.
     * This endpoint can be used with other interval endpoints
     * to convert values into a desired quote currency.
     */
    exchangeRatesInterval({ startISOString, endISOString }) {
        return this.getExchangeRatesIntervalV1({ startISOString, endISOString })
            .catch((err) => {
            console.error("Error in 'exchangeRatesInterval' method of nomics module\n" + err);
            throw new Error(err);
        });
    }
    //// private method ////
    async getExchangeRatesIntervalV1({ startISOString, endISOString }) {
        const start = `&start=${startISOString}`;
        const end = endISOString ? `&end=${endISOString}`
            : "";
        try {
            const response = await fetch(`https://api.nomics.com/v1/exchange-rates/interval?key=${this.apiKey}${start}${end}`);
            return response.json();
        }
        catch (err) {
            console.error("getExchangeRatesIntervalV1 failed");
            throw new Error(err);
        }
    }
    async getExchangeRatesHistoryV1({ nomicsCurrencyID, startISOString, endISOString }) {
        const cur = `&currency=${nomicsCurrencyID}`;
        const start = `&start=${startISOString}`;
        const end = endISOString ? `&end=${endISOString}`
            : "";
        try {
            const response = await fetch(`https://api.nomics.com/v1/exchange-rates/history?key=${this.apiKey}${cur}${start}${end}`);
            return response.json();
        }
        catch (err) {
            console.error("getExchangeRatesHistoryV1 failed");
            throw new Error(err);
        }
    }
    async getGlobalVolumeHistoryV1({ startISOString, endISOString }) {
        const start = startISOString ? `&start=${startISOString}`
            : "";
        const end = endISOString ? `&end=${endISOString}`
            : "";
        try {
            const response = await fetch(`https://api.nomics.com/v1/exchange-markets/interval?key=${this.apiKey}${start}${end}`);
            return response.json();
        }
        catch (err) {
            console.error("getGlobalVolumeHistoryV1 failed");
            throw new Error(err);
        }
    }
    async getExchangeOHLCVCandlesV1({ interval, exchange, market, startISOString, endISOString }) {
        const itv = `&interval=${interval}`;
        const ex = `&exchange=${exchange}`;
        const mkt = `&market=${market}`;
        const start = startISOString ? `&start=${startISOString}`
            : "";
        const end = endISOString ? `&end=${endISOString}`
            : "";
        try {
            const response = await fetch(`https://api.nomics.com/v1/exchange_candles?key=${this.apiKey}${itv}${ex}${mkt}${start}${end}`);
            return response.json();
        }
        catch (err) {
            console.error("getExchangeOHLCVCandlesV1 failed");
            throw new Error(err);
        }
    }
    async getAggregatedOHLCVCandlesV1({ interval, nomicsCurrencyID, startISOString, endISOString }) {
        const itv = `&interval=${interval}`;
        const cur = `&currency=${nomicsCurrencyID}`;
        const start = startISOString ? `&start=${startISOString}`
            : "";
        const end = endISOString ? `&end=${endISOString}`
            : "";
        try {
            const response = await fetch(`https://api.nomics.com/v1/candles?key=${this.apiKey}${itv}${cur}${start}${end}`);
            return response.json();
        }
        catch (err) {
            console.error("getAggregatedOHLCVCandlesV1 failed");
            throw new Error(err);
        }
    }
    async getDashboardV1() {
        try {
            const response = await fetch(`https://api.nomics.com/v1/dashboard?key=${this.apiKey}`);
            return response.json();
        }
        catch (err) {
            console.error("getDashboardV1 failed");
            throw new Error(err);
        }
    }
    async getMarketCapHistoryV1({ startISOString, endISOString }) {
        const start = `&start=${startISOString}`;
        const end = endISOString ? `&end=${endISOString}`
            : "";
        try {
            const response = await fetch(`https://api.nomics.com/v1/market-cap/history?key=${this.apiKey}${start}${end}`);
            return response.json();
        }
        catch (err) {
            console.error("getMarketCapHistoryV1 failed");
            throw new Error(err);
        }
    }
    async getExchangeMarketIntervalV1({ nomicsCurrencyID, exchange, startISOString, endISOString }) {
        const cu = nomicsCurrencyID ? `&currency=${nomicsCurrencyID}`
            : "";
        const ex = exchange ? `&exchange=${exchange}`
            : "";
        const end = endISOString ? `&end=${endISOString}`
            : "";
        const start = `&start=${startISOString}`;
        try {
            const response = await fetch(`https://api.nomics.com/v1/exchange-markets/interval?key=${this.apiKey}${cu}${ex}${start}${end}`);
            return response.json();
        }
        catch (err) {
            console.error("getExchangeMarketIntervalV1 failed");
            throw new Error(err);
        }
    }
    async getExchangeMarketPricesV1({ nomicsCurrencyID, exchange }) {
        const cr = nomicsCurrencyID ? `&currency=${nomicsCurrencyID}`
            : "";
        const ex = exchange ? `&exchange= ${exchange}`
            : "";
        try {
            const response = await fetch(`https://api.nomics.com/v1/exchange-markets/prices?key=${this.apiKey}${cr}${ex}`);
            return response.json();
        }
        catch (err) {
            console.error("getMarketIntervalV1 failed");
            throw new Error(err);
        }
    }
    async getMarketIntervalV1({ nomicsCurrencyID, hours, startISOString, endISOString }) {
        const h = hours ? `&hours=${hours}`
            : "";
        const start = startISOString ? `&start=${startISOString}`
            : "";
        const end = endISOString ? `&end=${endISOString}`
            : "";
        try {
            const response = await fetch(
            // tslint:disable-next-line:max-line-length
            `https://api.nomics.com/v1/markets/interval?key=${this.apiKey}&currency=${nomicsCurrencyID}${h}${start}${end}`);
            return response.json();
        }
        catch (err) {
            console.error("getMarketIntervalV1 failed");
            throw new Error(err);
        }
    }
    async getMarketsV1({ exchange, base, quote }) {
        const ex = exchange ? `&exchange=${exchange}`
            : "";
        const bs = base ? `&base=${base.join(",")}`
            : "";
        const qt = quote ? `&quote=${quote.join(",")}`
            : "";
        try {
            return (await fetch(`https://api.nomics.com/v1/markets?key=${this.apiKey}${ex}${bs}${qt}`)).json();
        }
        catch (err) {
            console.error("getMarketsV1 failed");
            throw new Error(err);
        }
    }
    async getSuppliesIntervalV1({ startISOString, endISOString }) {
        const end = endISOString ? `&end=${endISOString}`
            : "";
        try {
            return (await fetch(`https://api.nomics.com/v1/supplies/interval?key=${this.apiKey}&start=${startISOString}${end}`))
                .json();
        }
        catch (err) {
            console.error("getSuppliesIntervalV1 failed");
            throw new Error(err);
        }
    }
    async getAllTimeHighsV1() {
        try {
            const response = await fetch(`https://api.nomics.com/v1/currencies/highs?key=${this.apiKey}`);
            return response.json();
        }
        catch (err) {
            console.error("getAllTimeHighsV1 failed");
            throw new Error(err);
        }
    }
    async getMarketPricesV1({ nomicsCurrencyID }) {
        try {
            const response = await fetch(`https://api.nomics.com/v1/markets/prices?key=${this.apiKey}&currency=${nomicsCurrencyID}`);
            return response.json();
        }
        catch (err) {
            console.error("getMarketPricesV1 failed");
            throw new Error(err);
        }
    }
    async getPricesV1() {
        try {
            return await (await fetch(`https://api.nomics.com/v1/prices?key=${this.apiKey}`)).json();
        }
        catch (err) {
            console.error("getPricesV1 failed");
            throw new Error(err);
        }
    }
    async getCurrenciesV1() {
        try {
            return (await fetch(`https://api.nomics.com/v1/currencies?key=${this.apiKey}`)).json();
        }
        catch (err) {
            console.error("getCurrenciesV1 failed");
            throw new Error(err);
        }
    }
    async getExchangeRatesV1() {
        try {
            return (await fetch(`https://api.nomics.com/v1/exchange-rates?key=${this.apiKey}`)).json();
        }
        catch (err) {
            console.error("getExchangeRatesV1 failed");
            throw new Error(err);
        }
    }
    async getCurrenciesIntervalV1({ startISOString, endISOString }) {
        const end = endISOString ? `&end=${endISOString}`
            : "";
        try {
            return (await fetch(`https://api.nomics.com/v1/currencies/interval?key=${this.apiKey}&start=${startISOString}${end}`))
                .json();
        }
        catch (err) {
            console.error("getCurrenciesIntervalV1 failed");
            throw new Error(err);
        }
    }
    async getCurrenciesSparklineV1({ startISOString, endISOString }) {
        const end = endISOString ? `&end=${endISOString}`
            : "";
        try {
            return (await fetch(`https://api.nomics.com/v1/currencies/sparkline?key=${this.apiKey}&start=${startISOString}${end}`))
                .json();
        }
        catch (err) {
            console.error("getCurrenciesSparklineV1 failed");
            throw new Error(err);
        }
    }
}
exports.default = Nomics;
