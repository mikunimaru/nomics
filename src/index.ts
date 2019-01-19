if (fetch === undefined) {
  // tslint:disable
  // @ts-ignore
  var fetch = require("node-fetch");
}

export {NomicsNode} from "./nomicsNode";
// tslint:enable
export default class Nomics {

  private apiKey = "2018-09-demo-dont-deploy-b69315e440beb145";

  constructor({apiKey}: {apiKey?: string}) {
    apiKey ? this.apiKey = apiKey
           : console.log("The nomics class was initialized in demo mode.");
  }

  ////  Currencies ////

  /** The currencies endpoint returns all the currencies that Nomics supports. */
  currencies(): Promise<Array<{id: string}>> {
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
  prices(): Promise<Array<{ currency: string, price: string }>> {
    return this.getPricesV1()
      .catch((err) => {
        console.error("Error in 'prices' method of nomics module\n" + err);
        throw new Error(err);
      });
  }

  /** Open and close prices and volume for all currencies between a customizable time range. */
  currenciesInterval({ startISOString, endISOString }:
                     { startISOString: string, endISOString?: string }):
                     Promise<NomicsCurrencyInterval[]> {
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
  currenciesSparkline({ startISOString, endISOString }:
    { startISOString: string, endISOString?: string }): Promise<NomicsCurrenciesSparkline[]> {
    return this.getCurrenciesSparklineV1({ startISOString, endISOString })
      .catch((err) => {
        console.error("Error in 'currenciesSparkline' method of nomics module\n" + err);
        throw new Error(err);
      });
  }

  /** Open and close supply information for all currencies between a customizable time interval. */
  suppliesInterval({ startISOString, endISOString }:
                      { startISOString: string, endISOString?: string }):
                      Promise<NomicsCurrenciesSparkline[]> {
    return this.getSuppliesIntervalV1({ startISOString, endISOString })
      .catch((err) => {
        console.error("Error in 'suppliesInterval' method of nomics module\n" + err);
        throw new Error(err);
      });
  }

  /** Returns all time high information for all currencies. */
  allTimeHighs(): Promise<NomicsAllTimeHighs[]> {
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
  markets({exchange, base, quote}:
          {exchange?: string, base?: string[], quote?: string[]}): Promise<NomicsMarkets[]> {
    return this.getMarketsV1({exchange, base, quote})
      .catch((err) => {
        console.error("Error in 'markets' method of nomics module\n" + err);
        throw new Error(err);
      });
  }

  /**
   * The market prices endpoint returns prices in USD for
   * the last trade in each market with the given base currency.
   */
  marketPrices({ nomicsCurrencyID }: { nomicsCurrencyID: string }): Promise<NomicsMarketPrices[]> {
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
  marketInterval({nomicsCurrencyID, hours, startISOString, endISOString}:
                 {nomicsCurrencyID: string, hours?: number,
                  startISOString?: string, endISOString?: string}):
                  Promise<NomicsMarketInterval[]> {
      return this.getMarketIntervalV1({nomicsCurrencyID, hours, startISOString, endISOString})
        .catch((err) => {
          console.error("Error in 'marketInterval' method of nomics module\n" + err);
          throw new Error(err);
        });
  }

  /** The exchange market prices endpoint returns prices for the last trade in each market */
  exchangeMarketPrices({nomicsCurrencyID, exchange}: {nomicsCurrencyID?: string, exchange?: string}):
                          Promise<NomicsExchangeMarketPrices[]> {
    return this.getExchangeMarketPricesV1({nomicsCurrencyID, exchange})
      .catch((err) => {
        console.error("Error in 'exchangeMarketPrices' method of nomics module\n" + err);
        throw new Error(err);
      });
  }

  /**
   * The exchange market interval endpoint returns a summary of information about
   * all markets over a configurable time interval in their native values.
   */
  exchangeMarketInterval({nomicsCurrencyID, exchange, startISOString, endISOString}:
                         {nomicsCurrencyID?: string , exchange?: string,
                          startISOString: string, endISOString?: string}):
                         Promise<NomicsExchangeMarketInterval[]> {
    return this.getExchangeMarketIntervalV1({nomicsCurrencyID, exchange, startISOString, endISOString})
      .catch((err) => {
        console.error("Error in 'exchangeMarketInterval' method of nomics module\n" + err);
        throw new Error(err);
      });
  }

  /**
   * MarketCap History is the total market cap for
   * all cryptoassets at intervals between the requested time period.
   */
  marketCapHistory({startISOString, endISOString}:
                            {startISOString: string, endISOString?: string}):
                            Promise<Array<{timestamp: string, marketcap: string}>> {
    return this.getMarketCapHistoryV1({startISOString, endISOString})
      .catch((err) => {
        console.error("Error in 'marketCapHistory' method of nomics module\n" + err);
        throw new Error(err);
      });
  }

  /**
   * The dashboard endpoint is a high level view of the current state of the
   * market. It contains a wide variety of information and is updated every 10 seconds.
   */
  dashboard(): Promise<NomicsDashboard[]> {
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
  aggregatedOHLCVCandles({interval, nomicsCurrencyID, startISOString, endISOString}:
                            {interval: ("1d"|"1h"), nomicsCurrencyID: string,
                            startISOString?: string, endISOString?: string}):
                            Promise<NomicsAggregatedOHLCVCandles[]> {

    return this.getAggregatedOHLCVCandlesV1({interval, nomicsCurrencyID, startISOString, endISOString})
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
  exchangeOHLCVCandles({interval, exchange, market, startISOString, endISOString}:
                          {interval: ("1d"|"4h"|"1h"|"30m"|"5m"|"1m"), exchange: string, market: string,
                          startISOString?: string, endISOString?: string}):
                          Promise<NomicsExchangeOHLCVCandles[]> {

    return this.getExchangeOHLCVCandlesV1({interval, exchange, market, startISOString, endISOString})
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
  globalVolumeHistory({ startISOString, endISOString }:
                           { startISOString?: string, endISOString?: string }):
                           Promise<Array<{ timestamp: string, volume: string}>> {

    return this.getGlobalVolumeHistoryV1( {startISOString, endISOString} )
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
  exchangeRates(): Promise<Array<{currency: string, rate: string, timestamp: string}>> {
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
  exchangeRatesHistory({ nomicsCurrencyID, startISOString, endISOString }:
                          { nomicsCurrencyID: string, startISOString: string, endISOString?: string }):
                          Promise<Array<{timestamp: string, rate: string}>> {
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
  exchangeRatesInterval({startISOString, endISOString}:
                           {startISOString: string, endISOString?: string}):
                           Promise<NomicsExhangeRateInterval[]> {
    return this.getExchangeRatesIntervalV1({startISOString, endISOString})
      .catch((err) => {
        console.error("Error in 'exchangeRatesInterval' method of nomics module\n" + err);
        throw new Error(err);
      });
  }

  //// private method ////

  private async getExchangeRatesIntervalV1({startISOString, endISOString}:
                                 {startISOString: string, endISOString?: string}):
                                 Promise<NomicsExhangeRateInterval[]>  {
    const start              = `&start=${startISOString}`;
    const end = endISOString ? `&end=${endISOString}`
      : "";

    try {
    const response = await fetch(
    `https://api.nomics.com/v1/exchange-rates/interval?key=${this.apiKey}${start}${end}`);
    return response.json();
    } catch (err) {
      console.error("getExchangeRatesIntervalV1 failed");
      throw new Error(err);
    }
  }

  private async getExchangeRatesHistoryV1({ nomicsCurrencyID, startISOString, endISOString }:
                                { nomicsCurrencyID: string, startISOString: string, endISOString?: string }):
                                Promise<Array<{timestamp: string, rate: string}>> {
    const cur = `&currency=${nomicsCurrencyID}`;
    const start = `&start=${startISOString}`;
    const end = endISOString ? `&end=${endISOString}`
                             : "";

    try {
    const response = await fetch(
    `https://api.nomics.com/v1/exchange-rates/history?key=${this.apiKey}${cur}${start}${end}`);
    return response.json();
    } catch (err) {
      console.error("getExchangeRatesHistoryV1 failed");
      throw new Error(err);
    }
  }

  private async getGlobalVolumeHistoryV1({ startISOString, endISOString }:
                           { startISOString?: string, endISOString?: string }):
                           Promise<Array<{ timestamp: string, volume: string}>> {

    const start = startISOString ? `&start=${startISOString}`
                                 : "";
    const end   = endISOString   ? `&end=${endISOString}`
                                 : "";

    try {
      const response = await fetch(
        `https://api.nomics.com/v1/exchange-markets/interval?key=${this.apiKey}${start}${end}`);
      return response.json();
    } catch (err) {
      console.error("getGlobalVolumeHistoryV1 failed");
      throw new Error(err);
    }
  }

  private async getExchangeOHLCVCandlesV1({interval, exchange, market, startISOString, endISOString}:
                                  {interval: ("1d"|"4h"|"1h"|"30m"|"5m"|"1m"), exchange: string, market: string,
                                  startISOString?: string, endISOString?: string}):
                                  Promise<NomicsExchangeOHLCVCandles[]> {

    const itv = `&interval=${interval}`;
    const ex = `&exchange=${exchange}`;
    const mkt = `&market=${market}`;
    const start = startISOString ? `&start=${startISOString}`
            : "";
    const end = endISOString     ? `&end=${endISOString}`
            : "";

    try {
    const response = await fetch(
    `https://api.nomics.com/v1/exchange_candles?key=${this.apiKey}${itv}${ex}${mkt}${start}${end}`);
    return response.json();
    } catch (err) {
      console.error("getExchangeOHLCVCandlesV1 failed");
      throw new Error(err);
    }
  }

  private async getAggregatedOHLCVCandlesV1({interval, nomicsCurrencyID, startISOString, endISOString}:
                            {interval: ("1d"|"1h"), nomicsCurrencyID: string,
                             startISOString?: string, endISOString?: string}):
                             Promise<NomicsAggregatedOHLCVCandles[]> {

    const itv = `&interval=${interval}`;
    const cur = `&currency=${nomicsCurrencyID}`;
    const start = startISOString ? `&start=${startISOString}`
                                 : "";
    const end = endISOString     ? `&end=${endISOString}`
                                 : "";

    try {
      const response = await fetch(
        `https://api.nomics.com/v1/candles?key=${this.apiKey}${itv}${cur}${start}${end}`);
      return response.json();
    } catch (err) {
      console.error("getAggregatedOHLCVCandlesV1 failed");
      throw new Error(err);
    }
  }

  private async getDashboardV1(): Promise<NomicsDashboard[]> {
    try {
      const response = await fetch(`https://api.nomics.com/v1/dashboard?key=${this.apiKey}`);
      return response.json();
    } catch (err) {
      console.error("getDashboardV1 failed");
      throw new Error(err);
    }
  }

  private async getMarketCapHistoryV1({startISOString, endISOString}:
                              {startISOString: string, endISOString?: string}):
                              Promise<Array<{timestamp: string, marketcap: string}>> {
    const start              = `&start=${startISOString}`;
    const end = endISOString ? `&end=${endISOString}`
                             : "";

    try {
      const response = await fetch(
        `https://api.nomics.com/v1/market-cap/history?key=${this.apiKey}${start}${end}`);
      return response.json();
    } catch (err) {
      console.error("getMarketCapHistoryV1 failed");
      throw new Error(err);
    }
  }

  private async getExchangeMarketIntervalV1({nomicsCurrencyID, exchange, startISOString, endISOString}:
                                    {nomicsCurrencyID?: string , exchange?: string,
                                     startISOString: string, endISOString?: string}):
                                     Promise<NomicsExchangeMarketInterval[]> {
    const cu = nomicsCurrencyID ? `&currency=${nomicsCurrencyID}`
                               : "";
    const ex = exchange        ? `&exchange=${exchange}`
                               : "";
    const end = endISOString   ? `&end=${endISOString}`
                               : "";
    const start                = `&start=${startISOString}`;

    try {
      const response = await fetch(
        `https://api.nomics.com/v1/exchange-markets/interval?key=${this.apiKey}${cu}${ex}${start}${end}`);
      return response.json();
    } catch (err) {
      console.error("getExchangeMarketIntervalV1 failed");
      throw new Error(err);
    }
  }

  private async getExchangeMarketPricesV1({nomicsCurrencyID, exchange}:
                                          {nomicsCurrencyID?: string, exchange?: string}):
                                          Promise<NomicsExchangeMarketPrices[]> {
    const cr = nomicsCurrencyID ? `&currency=${nomicsCurrencyID}`
                               : "";
    const ex = exchange        ? `&exchange= ${exchange}`
                               : "";

    try {
      const response = await fetch(
        `https://api.nomics.com/v1/exchange-markets/prices?key=${this.apiKey}${cr}${ex}`);
      return response.json();
    } catch (err) {
      console.error("getMarketIntervalV1 failed");
      throw new Error(err);
    }
  }

  private async getMarketIntervalV1({nomicsCurrencyID, hours, startISOString, endISOString}:
    {nomicsCurrencyID: string, hours?: number, startISOString?: string, endISOString?: string}):
    Promise<NomicsMarketInterval[]> {
      const h  = hours             ? `&hours=${hours}`
                                   : "";
      const start = startISOString ? `&start=${startISOString}`
                                   : "";
      const end = endISOString     ? `&end=${endISOString}`
                                   : "";

      try {
        const response = await fetch(
          // tslint:disable-next-line:max-line-length
          `https://api.nomics.com/v1/markets/interval?key=${this.apiKey}&currency=${nomicsCurrencyID}${h}${start}${end}`);
        return response.json();
      } catch (err) {
        console.error("getMarketIntervalV1 failed");
        throw new Error(err);
      }
    }

  private async getMarketsV1({exchange, base, quote}:
                             {exchange?: string, base?: string[], quote?: string[]}):
                             Promise<NomicsMarkets[]> {
    const ex = exchange ? `&exchange=${exchange}`
                        : "";
    const bs = base     ? `&base=${base.join(",")}`
                        : "";
    const qt = quote    ? `&quote=${quote.join(",")}`
                        : "";

    try {
      return (await fetch(`https://api.nomics.com/v1/markets?key=${this.apiKey}${ex}${bs}${qt}`)).json();
    } catch (err) {
      console.error("getMarketsV1 failed");
      throw new Error(err);
    }
  }

  private async getSuppliesIntervalV1({ startISOString, endISOString }:
    { startISOString: string, endISOString?: string }): Promise<NomicsCurrenciesSparkline[]> {

    const end = endISOString ? `&end=${endISOString}`
      : "";
    try {
      return (await fetch(
        `https://api.nomics.com/v1/supplies/interval?key=${this.apiKey}&start=${startISOString}${end}`))
        .json();
    } catch (err) {
      console.error("getSuppliesIntervalV1 failed");
      throw new Error(err);
    }
  }

  private async getAllTimeHighsV1(): Promise<NomicsAllTimeHighs[]> {
    try {
      const response = await fetch(`https://api.nomics.com/v1/currencies/highs?key=${this.apiKey}`);
      return response.json();
    } catch (err) {
      console.error("getAllTimeHighsV1 failed");
      throw new Error(err);
    }
  }

  private async getMarketPricesV1({ nomicsCurrencyID }: { nomicsCurrencyID: string }):
                                   Promise<NomicsMarketPrices[]> {
    try {
      const response = await fetch(
        `https://api.nomics.com/v1/markets/prices?key=${this.apiKey}&currency=${nomicsCurrencyID}`);
      return response.json();
    } catch (err) {
      console.error("getMarketPricesV1 failed");
      throw new Error(err);
    }
  }

  private async getPricesV1(): Promise<Array<{ currency: string, price: string }>> {
    try {
      return await (await fetch(`https://api.nomics.com/v1/prices?key=${this.apiKey}`)).json();
    } catch (err) {
      console.error("getPricesV1 failed");
      throw new Error(err);
    }
  }

  private async getCurrenciesV1(): Promise<Array<{id: string}>>  {
    try {
      return (await fetch(`https://api.nomics.com/v1/currencies?key=${this.apiKey}`)).json();
    } catch (err) {
      console.error("getCurrenciesV1 failed");
      throw new Error(err);
    }
  }

  private async getExchangeRatesV1(): Promise<Array<{currency: string, rate: string, timestamp: string}>> {
    try {
      return (await fetch(`https://api.nomics.com/v1/exchange-rates?key=${this.apiKey}`)).json();
    } catch (err) {
      console.error("getExchangeRatesV1 failed");
      throw new Error(err);
    }
  }

  private async getCurrenciesIntervalV1({ startISOString, endISOString }:
    { startISOString: string, endISOString?: string }):
    Promise< NomicsCurrencyInterval[] >  {

    const end = endISOString ? `&end=${endISOString}`
      : "";
    try {
      return (await fetch(
        `https://api.nomics.com/v1/currencies/interval?key=${this.apiKey}&start=${startISOString}${end}`))
        .json();
    } catch (err) {
      console.error("getCurrenciesIntervalV1 failed");
      throw new Error(err);
    }
  }

  private async getCurrenciesSparklineV1({ startISOString, endISOString }:
    { startISOString: string, endISOString?: string }): Promise<NomicsCurrenciesSparkline[]> {

    const end = endISOString ? `&end=${endISOString}`
      : "";
    try {
      return (await fetch(
        `https://api.nomics.com/v1/currencies/sparkline?key=${this.apiKey}&start=${startISOString}${end}`))
        .json();
    } catch (err) {
      console.error("getCurrenciesSparklineV1 failed");
      throw new Error(err);
    }
  }
}

export interface NomicsCurrencyInterval {
  currency: string;
  volume: string;
  open: string;
  open_timestamp: string;
  close: string;
  close_timestamp: string;
}

export interface NomicsAllTimeHighs {
  currency: string;
  price: string;
  timestamp: string;
  exchange: string;
  quote: string;
}

export interface NomicsDashboard {
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

export interface NomicsCurrenciesSparkline {
  currency: string;
  timestamps: string[];
  prices: string[];
}

export interface NomicsMarkets {
  exchange: string;
  market: string;
  base: string;
  quote: string;
}

export interface NomicsMarketPrices {
  exchange: string;
  quote: string;
  price: string;
  timestamp: string;
}

export interface NomicsMarketInterval {
  exchange: string;
  quote: string;
  volume: string;
  open: string;
  open_timestamp: string;
  close: string;
  close_timestamp: string;
}

export interface NomicsExchangeMarketPrices {
  exchange: string;
  base: string;
  quote: string;
  price_quote: string;
  timestamp: string;
}

export interface NomicsExchangeMarketInterval {
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

export interface NomicsAggregatedOHLCVCandles {
  timestamp: string;
  low: string;
  open: string;
  close: string;
  high: string;
  volume: string;
}

export interface NomicsExchangeOHLCVCandles {
  timestamp: string;
  low: string;
  open: string;
  close: string;
  high: string;
  volume: string;
  num_trades: string;
}

export interface NomicsExhangeRateInterval {
  currency: string;
  open: string;
  open_timestamp: string;
  close: string;
  close_timestamp: string;
}
