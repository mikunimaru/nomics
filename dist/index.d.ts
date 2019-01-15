declare class Nomics {
    apiKey: string;
    constructor({ apiKey }: {
        apiKey?: string;
    });
    /** The currencies endpoint returns all the currencies that Nomics supports. */
    currencies(): Promise<void | Array<{
        id: string;
    }>>;
    /**
     * The prices endpoint returns current prices for all currencies.
     * Prices are updated every 10 seconds.
     */
    prices(): Promise<void | Array<{
        currency: string;
        price: string;
    }>>;
    /** Open and close prices and volume for all currencies between a customizable time range. */
    currenciesInterval({ startISOString, endISOString }: {
        startISOString: string;
        endISOString?: string;
    }): Promise<void | NomicsCurrencyInterval[]>;
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
    currenciesSparkline({ startISOString, endISOString }: {
        startISOString: string;
        endISOString?: string;
    }): Promise<void | NomicsCurrenciesSparkline[]>;
    /** Open and close supply information for all currencies between a customizable time interval. */
    suppliesInterval({ startISOString, endISOString }: {
        startISOString: string;
        endISOString?: string;
    }): Promise<void | NomicsCurrenciesSparkline[]>;
    /** Returns all time high information for all currencies. */
    allTimeHighs(): Promise<void | NomicsAllTimeHighs[]>;
    /**
     * The markets endpoint returns information on the exchanges and markets that
     * Nomics supports, in addition to the Nomics currency identifiers for the
     * base and quote currency.
     */
    markets({ exchange, base, quote }: {
        exchange?: string;
        base?: string[];
        quote?: string[];
    }): Promise<void | NomicsMarkets[]>;
    /**
     * The market prices endpoint returns prices in USD for
     * the last trade in each market with the given base currency.
     */
    marketPrices({ nomicsCurrencyID }: {
        nomicsCurrencyID: string;
    }): Promise<void | NomicsMarketPrices[]>;
    /**
     * The market interval endpoint returns a summary of information about all
     * markets based in a given currency over a configurable time interval.
     */
    marketInterval({ nomicsCurrencyID, hours, startISOString, endISOString }: {
        nomicsCurrencyID: string;
        hours?: number;
        startISOString?: string;
        endISOString?: string;
    }): Promise<void | NomicsMarketInterval[]>;
    /** The exchange market prices endpoint returns prices for the last trade in each market */
    exchangeMarketPrices({ nomicsCurrencyID, exchange }: {
        nomicsCurrencyID?: string;
        exchange?: string;
    }): Promise<void | NomicsExchangeMarketPrices[]>;
    /**
     * The exchange market interval endpoint returns a summary of information about
     * all markets over a configurable time interval in their native values.
     */
    exchangeMarketInterval({ nomicsCurrencyID, exchange, startISOString, endISOString }: {
        nomicsCurrencyID?: string;
        exchange?: string;
        startISOString: string;
        endISOString?: string;
    }): Promise<void | NomicsExchangeMarketInterval[]>;
    /**
     * MarketCap History is the total market cap for
     * all cryptoassets at intervals between the requested time period.
     */
    marketCapHistory({ startISOString, endISOString }: {
        startISOString: string;
        endISOString?: string;
    }): Promise<void | Array<{
        timestamp: string;
        marketcap: string;
    }>>;
    /**
     * The dashboard endpoint is a high level view of the current state of the
     * market. It contains a wide variety of information and is updated every 10 seconds.
     */
    dashboard(): Promise<void | NomicsDashboard[]>;
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
    aggregatedOHLCVCandles({ interval, nomicsCurrencyID, startISOString, endISOString }: {
        interval: ("1d" | "1h");
        nomicsCurrencyID: string;
        startISOString?: string;
        endISOString?: string;
    }): Promise<void | NomicsAggregatedOHLCVCandles[]>;
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
    exchangeOHLCVCandles({ interval, exchange, market, startISOString, endISOString }: {
        interval: ("1d" | "4h" | "1h" | "30m" | "5m" | "1m");
        exchange: string;
        market: string;
        startISOString?: string;
        endISOString?: string;
    }): Promise<void | NomicsExchangeOHLCVCandles[]>;
    /**
     * Volume History is the total volume for all cryptoassets
     * in USD at intervals between the requested time period.
     */
    globalVolumeHistory({ startISOString, endISOString }: {
        startISOString?: string;
        endISOString?: string;
    }): Promise<void | Array<{
        timestamp: string;
        volume: string;
    }>>;
    /**
     * The exchange rates endpoint returns the current exchange rates used by Nomics
     * to convert prices from markets into USD. This contains Fiat currencies as well
     * as a BTC and ETH quote prices. This endpoint helps normalize data across markets
     * as well as to provide localization for users.
     *
     * Currently, this endpoint does not support historical data, but this feature is planned.
     */
    exchangeRates(): Promise<void | Array<{
        currency: string;
        rate: string;
        timestamp: string;
    }>>;
    /**
     * Exchange rates for every point in a time range. This endpoint can be
     * used with other interval endpoints to convert values into a desired quote currency.
     *
     * The currency parameter must be a Nomics Quote Currency, to get all Nomics Quote
     * Currencies, use the /exchange-rates endpoint for all current rates.
     */
    exchangeRatesHistory({ nomicsCurrencyID, startISOString, endISOString }: {
        nomicsCurrencyID: string;
        startISOString: string;
        endISOString?: string;
    }): Promise<void | Array<{
        timestamp: string;
        rate: string;
    }>>;
    /**
     * Exchange rates to convert from USD over a time interval.
     * This endpoint can be used with other interval endpoints
     * to convert values into a desired quote currency.
     */
    exchangeRatesInterval({ startISOString, endISOString }: {
        startISOString: string;
        endISOString?: string;
    }): Promise<void | NomicsExhangeRateInterval[]>;
    private getExchangeRatesIntervalV1;
    private getExchangeRatesHistoryV1;
    private getGlobalVolumeHistoryV1;
    private getExchangeOHLCVCandlesV1;
    private getAggregatedOHLCVCandlesV1;
    private getDashboardV1;
    private getMarketCapHistoryV1;
    private getExchangeMarketIntervalV1;
    private getExchangeMarketPricesV1;
    private getMarketIntervalV1;
    private getMarketsV1;
    private getSuppliesIntervalV1;
    private getAllTimeHighsV1;
    private getMarketPricesV1;
    private getPricesV1;
    private getCurrenciesV1;
    private getExchangeRatesV1;
    private getCurrenciesIntervalV1;
    private getCurrenciesSparklineV1;
}
interface NomicsCurrencyInterval {
    currency: string;
    volume: string;
    open: string;
    open_timestamp: string;
    close: string;
    close_timestamp: string;
}
interface NomicsAllTimeHighs {
    currency: string;
    price: string;
    timestamp: string;
    exchange: string;
    quote: string;
}
interface NomicsDashboard {
    currency: string;
    dayOpen: string;
    dayVolume: string;
    dayOpenVolume: string;
    weekOpen: string;
    weekVolume: string;
    weekOpenVolume: string;
    monthOpen: string;
    monthVolume: string;
    monthOpenVolume: string;
    yearOpen: string;
    yearVolume: string;
    yearOpenVolume: string;
    close: string;
    high: string;
    highTimestamp: string;
    highExchange: string;
    highQuoteCurrency: string;
    availableSupply: string;
    maxSupply: string;
}
interface NomicsCurrenciesSparkline {
    currency: string;
    timestamps: string[];
    prices: string[];
}
interface NomicsMarkets {
    exchange: string;
    market: string;
    base: string;
    quote: string;
}
interface NomicsMarketPrices {
    exchange: string;
    quote: string;
    price: string;
    timestamp: string;
}
interface NomicsMarketInterval {
    exchange: string;
    quote: string;
    volume: string;
    open: string;
    open_timestamp: string;
    close: string;
    close_timestamp: string;
}
interface NomicsExchangeMarketPrices {
    exchange: string;
    base: string;
    quote: string;
    price_quote: string;
    timestamp: string;
}
interface NomicsExchangeMarketInterval {
    exchange: string;
    base: string;
    quote: string;
    volume_base: string;
    volume_usd: string;
    open_quote: string;
    open_timestamp: string;
    close_quote: string;
    close_timestamp: string;
    num_trades: string;
}
interface NomicsAggregatedOHLCVCandles {
    timestamp: string;
    low: string;
    open: string;
    close: string;
    high: string;
    volume: string;
}
interface NomicsExchangeOHLCVCandles {
    timestamp: string;
    low: string;
    open: string;
    close: string;
    high: string;
    volume: string;
    num_trades: string;
}
interface NomicsExhangeRateInterval {
    currency: string;
    open: string;
    open_timestamp: string;
    close: string;
    close_timestamp: string;
}
//# sourceMappingURL=index.d.ts.map