import Nomics from "./index";
import {NomicsCurrencyInterval} from "./index";

/**
 * This class converts the data retrieved by the API
 * into an easy-to-process format and returns it.
 */
export class NomicsNode {

  private api: Nomics;

  constructor({ apiKey }: { apiKey?: string }) {
    this.api = new Nomics({ apiKey });
  }

  /**
   * Get currencies with a single Array.
   * [ '0XBTC',
   *   '1ST',
   *   '2GIVE',
   *   '3DES',
   *   ...
   */
  async currenciesArray(): Promise<string[]> {
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
  async pricesObject(): Promise<NomicsNodePrices> {
    const pricesArray = await this.api.prices();
    const pricesObject: NomicsNodePrices =
      pricesArray.reduce<NomicsNodePrices>((previousValue, currentValue) => {
        const currencyName = /^[_A-Za-z]/.test(currentValue.currency)
                           ? currentValue.currency
                           : "_" + currentValue.currency;

        return {...previousValue, [currencyName] : Number(currentValue.price)};
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
  async exchangeRatesObject(): Promise<NomicsNodeExchangeRatesObject> {
    const ratesArray = await this.api.exchangeRates();
    // @ts-ignore
    const ratesObject: NomicsNodeExchangeRatesObject =
      ratesArray.reduce((previousValue, currentValue) => {
        return {
          ...previousValue,
          [currentValue.currency] : {
            currency: currentValue.currency,
            rate: Number(currentValue.rate),
            timestamp: currentValue.timestamp,
          },
        };
      }, {});

    return ratesObject;
  }

  /** Dashboard version of the pricesObject method. */
  async dashboardObject(): Promise<NomicsNodeDashboardObject> {
    const dashboard = await this.api.dashboard();
    const dashboardObject: NomicsNodeDashboardObject =
      dashboard.reduce<NomicsNodeDashboardObject>((previousValue, currentValue) => {
        /** Change the key name for easy handling in GraphQL */
        const currencyName = /^[_A-Za-z]/.test(currentValue.currency)
                          ? currentValue.currency
                          : "_" + currentValue.currency;

        const numberObj =
          Object.entries(currentValue).reduce((pValue, cValue) => {
            const value = ["currency" , "highTimestamp" , "highExchange", "highQuoteCurrency"].includes(cValue[0])
                        ? cValue[1]
                        : Number(cValue[1]);
            return {...pValue, [cValue[0]]: value};
          }, {});

        return {...previousValue, [currencyName] : numberObj};
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
  async currenciesIntervalObject({ startISOString, endISOString }:
    { startISOString: string, endISOString?: string }):
    Promise<NomicsNodeCurrenciesIntervalObject> {
      const currenciesInterval = await this.api.currenciesInterval({startISOString, endISOString});

      const currenciesIntervalObject =
        currenciesInterval.reduce<NomicsNodeCurrenciesIntervalObject>((previousValue, currentValue) => {
          /** Change the key name for easy handling in GraphQL */
          const currencyName = /^[_A-Za-z]/.test(currentValue.currency)
                            ? currentValue.currency
                            : "_" + currentValue.currency;

          const numberObj =
            Object.entries(currentValue).reduce((pValue, cValue) => {
              const value = ["currency" , "open_timestamp" , "close_timestamp"].includes(cValue[0])
                          ? cValue[1]
                          : Number(cValue[1]);
              return {...pValue, [cValue[0]]: value};
            }, {});

          return {...previousValue, [currencyName] : numberObj};
        // @ts-ignore
        }, {});
      return currenciesIntervalObject;
    }

  private currenciesInterval24h() {
    const yesterday =  (new Date(Date.now() - (86400 * 1000))).toISOString().split(".")[0] + "Z";
    return this.currenciesIntervalObject({startISOString: yesterday});
  }

}

type NomicsNodeCurrenciesIntervalObject = {
  [key in NomicsNodePricesCurrencies]: NomicsNodeCurrencyInterval;
};

interface NomicsNodeCurrencyInterval {
  currency: string;
  volume: number;
  open: number;
  open_timestamp: string;
  close: number;
  close_timestamp: string;
}

interface NomicsNodeExchangeRatesObject {
  AED: NomicsNodeExchangeRates;
  AFN: NomicsNodeExchangeRates;
  ALL: NomicsNodeExchangeRates;
  AMD: NomicsNodeExchangeRates;
  ANG: NomicsNodeExchangeRates;
  AOA: NomicsNodeExchangeRates;
  ARS: NomicsNodeExchangeRates;
  AUD: NomicsNodeExchangeRates;
  AWG: NomicsNodeExchangeRates;
  AZN: NomicsNodeExchangeRates;
  BAM: NomicsNodeExchangeRates;
  BBD: NomicsNodeExchangeRates;
  BDT: NomicsNodeExchangeRates;
  BGN: NomicsNodeExchangeRates;
  BHD: NomicsNodeExchangeRates;
  BIF: NomicsNodeExchangeRates;
  BMD: NomicsNodeExchangeRates;
  BND: NomicsNodeExchangeRates;
  BOB: NomicsNodeExchangeRates;
  BRL: NomicsNodeExchangeRates;
  BSD: NomicsNodeExchangeRates;
  BTC: NomicsNodeExchangeRates;
  BTN: NomicsNodeExchangeRates;
  BWP: NomicsNodeExchangeRates;
  BYN: NomicsNodeExchangeRates;
  BYR: NomicsNodeExchangeRates;
  BZD: NomicsNodeExchangeRates;
  CAD: NomicsNodeExchangeRates;
  CDF: NomicsNodeExchangeRates;
  CHF: NomicsNodeExchangeRates;
  CLF: NomicsNodeExchangeRates;
  CLP: NomicsNodeExchangeRates;
  CNY: NomicsNodeExchangeRates;
  COP: NomicsNodeExchangeRates;
  CRC: NomicsNodeExchangeRates;
  CUC: NomicsNodeExchangeRates;
  CUP: NomicsNodeExchangeRates;
  CVE: NomicsNodeExchangeRates;
  CZK: NomicsNodeExchangeRates;
  DJF: NomicsNodeExchangeRates;
  DKK: NomicsNodeExchangeRates;
  DOP: NomicsNodeExchangeRates;
  DZD: NomicsNodeExchangeRates;
  EGP: NomicsNodeExchangeRates;
  ERN: NomicsNodeExchangeRates;
  ETB: NomicsNodeExchangeRates;
  ETH: NomicsNodeExchangeRates;
  EUR: NomicsNodeExchangeRates;
  FJD: NomicsNodeExchangeRates;
  FKP: NomicsNodeExchangeRates;
  GBP: NomicsNodeExchangeRates;
  GEL: NomicsNodeExchangeRates;
  GGP: NomicsNodeExchangeRates;
  GHS: NomicsNodeExchangeRates;
  GIP: NomicsNodeExchangeRates;
  GMD: NomicsNodeExchangeRates;
  GNF: NomicsNodeExchangeRates;
  GTQ: NomicsNodeExchangeRates;
  GYD: NomicsNodeExchangeRates;
  HKD: NomicsNodeExchangeRates;
  HNL: NomicsNodeExchangeRates;
  HRK: NomicsNodeExchangeRates;
  HTG: NomicsNodeExchangeRates;
  HUF: NomicsNodeExchangeRates;
  IDR: NomicsNodeExchangeRates;
  ILS: NomicsNodeExchangeRates;
  IMP: NomicsNodeExchangeRates;
  INR: NomicsNodeExchangeRates;
  IQD: NomicsNodeExchangeRates;
  IRR: NomicsNodeExchangeRates;
  ISK: NomicsNodeExchangeRates;
  JEP: NomicsNodeExchangeRates;
  JMD: NomicsNodeExchangeRates;
  JOD: NomicsNodeExchangeRates;
  JPY: NomicsNodeExchangeRates;
  KES: NomicsNodeExchangeRates;
  KGS: NomicsNodeExchangeRates;
  KHR: NomicsNodeExchangeRates;
  KMF: NomicsNodeExchangeRates;
  KPW: NomicsNodeExchangeRates;
  KRW: NomicsNodeExchangeRates;
  KWD: NomicsNodeExchangeRates;
  KYD: NomicsNodeExchangeRates;
  KZT: NomicsNodeExchangeRates;
  LAK: NomicsNodeExchangeRates;
  LBP: NomicsNodeExchangeRates;
  LKR: NomicsNodeExchangeRates;
  LRD: NomicsNodeExchangeRates;
  LSL: NomicsNodeExchangeRates;
  LTL: NomicsNodeExchangeRates;
  LVL: NomicsNodeExchangeRates;
  LYD: NomicsNodeExchangeRates;
  MAD: NomicsNodeExchangeRates;
  MDL: NomicsNodeExchangeRates;
  MGA: NomicsNodeExchangeRates;
  MKD: NomicsNodeExchangeRates;
  MMK: NomicsNodeExchangeRates;
  MNT: NomicsNodeExchangeRates;
  MOP: NomicsNodeExchangeRates;
  MRO: NomicsNodeExchangeRates;
  MUR: NomicsNodeExchangeRates;
  MVR: NomicsNodeExchangeRates;
  MWK: NomicsNodeExchangeRates;
  MXN: NomicsNodeExchangeRates;
  MYR: NomicsNodeExchangeRates;
  MZN: NomicsNodeExchangeRates;
  NAD: NomicsNodeExchangeRates;
  NGN: NomicsNodeExchangeRates;
  NIO: NomicsNodeExchangeRates;
  NOK: NomicsNodeExchangeRates;
  NPR: NomicsNodeExchangeRates;
  NZD: NomicsNodeExchangeRates;
  OMR: NomicsNodeExchangeRates;
  PAB: NomicsNodeExchangeRates;
  PEN: NomicsNodeExchangeRates;
  PGK: NomicsNodeExchangeRates;
  PHP: NomicsNodeExchangeRates;
  PKR: NomicsNodeExchangeRates;
  PLN: NomicsNodeExchangeRates;
  PYG: NomicsNodeExchangeRates;
  QAR: NomicsNodeExchangeRates;
  RON: NomicsNodeExchangeRates;
  RSD: NomicsNodeExchangeRates;
  RUB: NomicsNodeExchangeRates;
  RWF: NomicsNodeExchangeRates;
  SAR: NomicsNodeExchangeRates;
  SBD: NomicsNodeExchangeRates;
  SCR: NomicsNodeExchangeRates;
  SDG: NomicsNodeExchangeRates;
  SEK: NomicsNodeExchangeRates;
  SGD: NomicsNodeExchangeRates;
  SHP: NomicsNodeExchangeRates;
  SLL: NomicsNodeExchangeRates;
  SOS: NomicsNodeExchangeRates;
  SRD: NomicsNodeExchangeRates;
  STD: NomicsNodeExchangeRates;
  SVC: NomicsNodeExchangeRates;
  SYP: NomicsNodeExchangeRates;
  SZL: NomicsNodeExchangeRates;
  THB: NomicsNodeExchangeRates;
  TJS: NomicsNodeExchangeRates;
  TMT: NomicsNodeExchangeRates;
  TND: NomicsNodeExchangeRates;
  TOP: NomicsNodeExchangeRates;
  TRY: NomicsNodeExchangeRates;
  TTD: NomicsNodeExchangeRates;
  TWD: NomicsNodeExchangeRates;
  TZS: NomicsNodeExchangeRates;
  UAH: NomicsNodeExchangeRates;
  UGX: NomicsNodeExchangeRates;
  USD: NomicsNodeExchangeRates;
  UYU: NomicsNodeExchangeRates;
  UZS: NomicsNodeExchangeRates;
  VEF: NomicsNodeExchangeRates;
  VND: NomicsNodeExchangeRates;
  VUV: NomicsNodeExchangeRates;
  WST: NomicsNodeExchangeRates;
  XAF: NomicsNodeExchangeRates;
  XAG: NomicsNodeExchangeRates;
  XAU: NomicsNodeExchangeRates;
  XCD: NomicsNodeExchangeRates;
  XDR: NomicsNodeExchangeRates;
  XOF: NomicsNodeExchangeRates;
  XPF: NomicsNodeExchangeRates;
  YER: NomicsNodeExchangeRates;
  ZAR: NomicsNodeExchangeRates;
  ZMK: NomicsNodeExchangeRates;
  ZMW: NomicsNodeExchangeRates;
  ZWL: NomicsNodeExchangeRates;
}
interface NomicsNodeExchangeRates {
  currency: string;
  rate: number;
  timestamp: string;
}

type NomicsNodePricesCurrencies = keyof NomicsNodePrices;
type NomicsNodeDashboardObject = {
  [key in NomicsNodePricesCurrencies]: NomicsNodeDashboard;
};

interface NomicsNodeDashboard {
  currency: string;
  dayOpen: number;
  dayVolume: number;
  dayOpenVolume: number;
  weekOpen: number;
  weekVolume: number;
  weekOpenVolume: number;
  monthOpen: number;
  monthVolume: number;
  monthOpenVolume: number;
  yearOpen: number;
  yearVolume: number;
  yearOpenVolume: number;
  close: number;
  high: number;
  highTimestamp: string;
  highExchange: string;
  highQuoteCurrency: string;
  availableSupply: number;
  maxSupply: number;
}

interface NomicsNodePrices {
  _1ST: number;
  _2GIVE: number;
  ABA: number;
  ABT: number;
  ABTC: number;
  ABY: number;
  ABYSS: number;
  ACAD: number;
  ACAT: number;
  ACO: number;
  ACT: number;
  ADA: number;
  ADB: number;
  ADH: number;
  ADT: number;
  ADX: number;
  AE: number;
  AEON: number;
  AGI: number;
  AID: number;
  AION: number;
  ALTX: number;
  AMB: number;
  AMN: number;
  AMP: number;
  ANT: number;
  APPC: number;
  ARCONA: number;
  ARDR: number;
  ARK: number;
  ARN: number;
  ART: number;
  AST: number;
  ATM: number;
  ATMI: number;
  ATP: number;
  AUC: number;
  AURA: number;
  AUTO: number;
  AVT: number;
  AXPR: number;
  B2G: number;
  B2X: number;
  BANCA: number;
  BAT: number;
  BAX: number;
  BAY: number;
  BBK: number;
  BCD: number;
  BCDN: number;
  BCDT: number;
  BCH: number;
  BCI: number;
  BCN: number;
  BCPT: number;
  BCX: number;
  BDG: number;
  BEAT: number;
  BEE: number;
  BERRY: number;
  BET: number;
  BETR: number;
  BFT: number;
  BIFI: number;
  BIT: number;
  BITB: number;
  BITCOINUS: number;
  BITS: number;
  BKX: number;
  BLK: number;
  BLOCK: number;
  BLT: number;
  BLUE: number;
  BLZ: number;
  BMC: number;
  BMH: number;
  BNB: number;
  BNK: number;
  BNT: number;
  BNTY: number;
  BOE: number;
  BOS: number;
  BOT: number;
  BOXX: number;
  BPT: number;
  BRD: number;
  BRK: number;
  BRN: number;
  BRX: number;
  BSD: number;
  BSV: number;
  BTC: number;
  BTCP: number;
  BTG: number;
  BTM: number;
  BTO: number;
  BTS: number;
  BTT: number;
  BTX: number;
  BU: number;
  BURST: number;
  BUS: number;
  BWX: number;
  BXC: number;
  C20: number;
  C8: number;
  CAJ: number;
  CANN: number;
  CAS: number;
  CAT: number;
  CBC: number;
  CBT: number;
  CCL: number;
  CDCC: number;
  CDT: number;
  CEEK: number;
  CEL: number;
  CENNZ: number;
  CHAT: number;
  CHP: number;
  CHSB: number;
  CHX: number;
  CLAM: number;
  CLN: number;
  CLO: number;
  CLOAK: number;
  CMCT: number;
  CMS: number;
  CMT: number;
  CND: number;
  CNN: number;
  COFI: number;
  COIN: number;
  COV: number;
  COVAL: number;
  CPAY: number;
  CPC: number;
  CPT: number;
  CPY: number;
  CRPT: number;
  CRW: number;
  CS: number;
  CSM: number;
  CST: number;
  CURE: number;
  CUZ: number;
  CVC: number;
  CVCOIN: number;
  CXO: number;
  CYFM: number;
  DAD: number;
  DAG: number;
  DAI: number;
  DAN: number;
  DASH: number;
  DATA: number;
  DATX: number;
  DAV: number;
  DAY: number;
  DBC: number;
  DBET: number;
  DBIX: number;
  DCN: number;
  DCR: number;
  DCT: number;
  DDD: number;
  DENT: number;
  DGB: number;
  DGD: number;
  DGTX: number;
  DICE: number;
  DLT: number;
  DMD: number;
  DML: number;
  DMT: number;
  DNN: number;
  DNT: number;
  DOCK: number;
  DOGE: number;
  DOPE: number;
  DOR: number;
  DOVU: number;
  DPN: number;
  DPY: number;
  DRGN: number;
  DROP: number;
  DRPU: number;
  DRT: number;
  DSCP: number;
  DTA: number;
  DTB: number;
  DTH: number;
  DWS: number;
  DX: number;
  DXT: number;
  DYN: number;
  EBKC: number;
  EBST: number;
  ECOM: number;
  EDG: number;
  EDN: number;
  EDO: number;
  EDR: number;
  EEE: number;
  EET: number;
  EGC: number;
  EJOY: number;
  EKO: number;
  ELEC: number;
  ELF: number;
  EMC: number;
  EMC2: number;
  ENG: number;
  ENGT: number;
  ENJ: number;
  EOS: number;
  EOSDAC: number;
  EPY: number;
  ERO: number;
  ESS: number;
  ETC: number;
  ETH: number;
  ETHOS: number;
  ETN: number;
  ETP: number;
  EVX: number;
  EXCL: number;
  EXMR: number;
  EXP: number;
  EXRN: number;
  FACE: number;
  FCN: number;
  FCT: number;
  FDZ: number;
  FLDC: number;
  FLO: number;
  FLP: number;
  FMF: number;
  FOAM: number;
  FOTA: number;
  FREC: number;
  FRES: number;
  FSN: number;
  FTC: number;
  FTI: number;
  FTM: number;
  FTT: number;
  FTX: number;
  FTXT: number;
  FUEL: number;
  FUN: number;
  FXT: number;
  FYN: number;
  FYP: number;
  GAM: number;
  GAME: number;
  GARD: number;
  GAS: number;
  GBG: number;
  GBX: number;
  GBYTE: number;
  GEM: number;
  GEN: number;
  GENE: number;
  GEO: number;
  GLA: number;
  GLD: number;
  GMR: number;
  GNO: number;
  GNT: number;
  GNX: number;
  GO: number;
  GOLOS: number;
  GRC: number;
  GRID: number;
  GRMD: number;
  GRS: number;
  GSE: number;
  GTC: number;
  GTO: number;
  GUP: number;
  GUSD: number;
  GVT: number;
  GXS: number;
  H2O: number;
  HAND: number;
  HAV: number;
  HBT: number;
  HBZ: number;
  HC: number;
  HER: number;
  HGT: number;
  HIT: number;
  HMQ: number;
  HOT: number;
  HPC: number;
  HQX: number;
  HSC: number;
  HTML: number;
  HUC: number;
  HVN: number;
  HYDRO: number;
  HYPRO: number;
  ICX: number;
  IDH: number;
  IDXM: number;
  IGNIS: number;
  IHT: number;
  INCNT: number;
  INCX: number;
  INK: number;
  INNBC: number;
  INS: number;
  INT: number;
  INV: number;
  IOC: number;
  ION: number;
  IOP: number;
  IOST: number;
  IOT: number;
  IOTX: number;
  IPL: number;
  IQ: number;
  ITT: number;
  IVY: number;
  IXT: number;
  JBC: number;
  JNT: number;
  JOT: number;
  KAYA: number;
  KBC: number;
  KEY: number;
  KICK: number;
  KIN: number;
  KIND: number;
  KMD: number;
  KNC: number;
  KORE: number;
  KRL: number;
  KWATT: number;
  LBA: number;
  LBC: number;
  LCK: number;
  LEDU: number;
  LEMO: number;
  LEND: number;
  LIF: number;
  LIFE: number;
  LINK: number;
  LION: number;
  LND: number;
  LOC: number;
  LOOM: number;
  LPT: number;
  LRC: number;
  LRN: number;
  LSK: number;
  LST: number;
  LTC: number;
  LUC: number;
  LUN: number;
  LYM: number;
  MAID: number;
  MAN: number;
  MANA: number;
  MCO: number;
  MDA: number;
  MDS: number;
  MDT: number;
  MED: number;
  MEDX: number;
  MEETONE: number;
  MEME: number;
  MER: number;
  MESSE: number;
  MET: number;
  MFT: number;
  MFTU: number;
  MGO: number;
  MITH: number;
  MITX: number;
  MKR: number;
  MLD: number;
  MLN: number;
  MNX: number;
  MOBI: number;
  MOD: number;
  MONA: number;
  MORE: number;
  MORPH: number;
  MOT: number;
  MRK: number;
  MRPH: number;
  MRS: number;
  MSP: number;
  MTH: number;
  MTL: number;
  MTN: number;
  MTX: number;
  MUE: number;
  MUSIC: number;
  MWAT: number;
  MXC: number;
  MXM: number;
  MYB: number;
  MYST: number;
  NANO: number;
  NAS: number;
  NAV: number;
  NAVI: number;
  NBAI: number;
  NCA: number;
  NCASH: number;
  NCC: number;
  NCT: number;
  NDC: number;
  NEBL: number;
  NEC: number;
  NEO: number;
  NEOS: number;
  NEXO: number;
  NEXT: number;
  NGC: number;
  NIM: number;
  NIO: number;
  NKN: number;
  NLC2: number;
  NLG: number;
  NMC: number;
  NMR: number;
  NOAH: number;
  NPCL: number;
  NPLC: number;
  NPX: number;
  NPXS: number;
  NTK: number;
  NULS: number;
  NXC: number;
  NXS: number;
  NXT: number;
  OAK: number;
  OAX: number;
  OCN: number;
  ODE: number;
  OIO: number;
  OK: number;
  OLT: number;
  OMG: number;
  OMNI: number;
  OMX: number;
  ONL: number;
  ONT: number;
  OPT: number;
  ORME: number;
  ORS: number;
  OST: number;
  OTN: number;
  OWN: number;
  PAI: number;
  PAL: number;
  PARETO: number;
  PART: number;
  PASC: number;
  PASS: number;
  PAT: number;
  PAX: number;
  PAY: number;
  PBTT: number;
  PCL: number;
  PFR: number;
  PHX: number;
  PINK: number;
  PITCH: number;
  PIVX: number;
  PIX: number;
  PKG: number;
  PLBT: number;
  PLR: number;
  PLU: number;
  PMA: number;
  PMNT: number;
  PNK: number;
  PNT: number;
  POA: number;
  POE: number;
  POLL: number;
  POLY: number;
  POT: number;
  POWR: number;
  PPC: number;
  PPT: number;
  PRE: number;
  PRO: number;
  PST: number;
  PTOY: number;
  PXG: number;
  QASH: number;
  QBT: number;
  QKC: number;
  QLC: number;
  QNT: number;
  QNTU: number;
  QRL: number;
  QSP: number;
  QTUM: number;
  QWARK: number;
  R: number;
  RADS: number;
  RATING: number;
  RCN: number;
  RDD: number;
  RDN: number;
  RED: number;
  REM: number;
  REN: number;
  REP: number;
  REQ: number;
  REX: number;
  RFR: number;
  RIK: number;
  RLC: number;
  RLX: number;
  RMESH: number;
  RNTB: number;
  ROX: number;
  RPM: number;
  RRT: number;
  RTE: number;
  RUFF: number;
  RVN: number;
  RVR: number;
  SALT: number;
  SAN: number;
  SBD: number;
  SBTC: number;
  SC: number;
  SCC: number;
  SCL: number;
  SEER: number;
  SEN: number;
  SENC: number;
  SENT: number;
  SEQ: number;
  SGN: number;
  SHIFT: number;
  SHIP: number;
  SIB: number;
  SIG: number;
  SILK: number;
  SKCH: number;
  SKIN: number;
  SKM: number;
  SKR: number;
  SKY: number;
  SLR: number;
  SLS: number;
  SLX: number;
  SMART: number;
  SMT: number;
  SNC: number;
  SNET: number;
  SNGLS: number;
  SNM: number;
  SNR: number;
  SNT: number;
  SNTR: number;
  SOC: number;
  SOLVE: number;
  SOP: number;
  SOUL: number;
  SPANK: number;
  SPC: number;
  SPD: number;
  SPF: number;
  SPHR: number;
  SPN: number;
  SRN: number;
  SS: number;
  STAR: number;
  STEEM: number;
  STORJ: number;
  STORM: number;
  STQ: number;
  STRAT: number;
  STU: number;
  STX: number;
  SUB: number;
  SUNC: number;
  SUR: number;
  SVD: number;
  SWFTC: number;
  SWM: number;
  SWT: number;
  SWTH: number;
  SYNX: number;
  SYS: number;
  T2T: number;
  TAAS: number;
  TALAO: number;
  TAU: number;
  TCT: number;
  TDP: number;
  TDS: number;
  TEL: number;
  TFD: number;
  TGAME: number;
  THC: number;
  THETA: number;
  THRT: number;
  TILE: number;
  TIME: number;
  TIPS: number;
  TIV: number;
  TIX: number;
  TKA: number;
  TKN: number;
  TKS: number;
  TKY: number;
  TNB: number;
  TNC: number;
  TNT: number;
  TOLL: number;
  TRAC: number;
  TRAD: number;
  TRST: number;
  TRUE: number;
  TRX: number;
  TTU: number;
  TTV: number;
  TUBE: number;
  TUSD: number;
  TV: number;
  TX: number;
  UBEX: number;
  UBQ: number;
  UBT: number;
  UET: number;
  UKG: number;
  UMT: number;
  UNC: number;
  UP: number;
  UPP: number;
  USC: number;
  USDS: number;
  USDT: number;
  USE: number;
  USNBT: number;
  UTK: number;
  UTT: number;
  UUU: number;
  VEE: number;
  VET: number;
  VIA: number;
  VIB: number;
  VIBE: number;
  VIEW: number;
  VITE: number;
  VLD: number;
  VOCO: number;
  VRC: number;
  VRM: number;
  VTC: number;
  VXV: number;
  WABI: number;
  WAN: number;
  WAVES: number;
  WAX: number;
  WBT: number;
  WEB: number;
  WIKI: number;
  WINGS: number;
  WISH: number;
  WIZ: number;
  WLO: number;
  WPR: number;
  WTC: number;
  X8X: number;
  XAUR: number;
  XBP: number;
  XCLR: number;
  XCP: number;
  XDCE: number;
  XDN: number;
  XEL: number;
  XEM: number;
  XES: number;
  XHV: number;
  XLM: number;
  XMC: number;
  XMO: number;
  XMR: number;
  XMY: number;
  XNK: number;
  XPM: number;
  XRA: number;
  XRP: number;
  XRT: number;
  XST: number;
  XTZ: number;
  XUC: number;
  XVG: number;
  XWC: number;
  XYO: number;
  XZC: number;
  YCC: number;
  YOYOW: number;
  ZAP: number;
  ZCL: number;
  ZCN: number;
  ZEC: number;
  ZEN: number;
  ZIL: number;
  ZPT: number;
  ZRC: number;
  ZRX: number;
  ZSC: number;
}
