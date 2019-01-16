cnomics
=======
The node.js module for the [nomics.com][] API.

[nomics.com]:https://nomics.com/?_ga=2.244675660.891324781.1547458344-1630628654.1547458344

Install
-------

    npm install --save mikunimaru/nomics.git

Usage
-----
Each class requires an API key as its initial value.  
If it is blank, it will operate in demo mode.

    new Nomics({}) // Demo mode.
    new Nomics({apiKey: "your-api-key"}) // Normal mode

### Class

### Nomics (default export)

It is a class corresponding [API name][] and method name with 1: 1.  
Returns data of type Object.

[API name]:http://docs.nomics.com
### NomicsNode

Class that returns processed data.  

#### currenciesArray()
Array of nomics currency id.  

    [ '0XBTC','1ST','2GIVE','3DES', ...

#### pricesObject()
An object of Prices.  

     { _1ST: '0.02829',
       _2GIVE: '0.00138',
       ABA: '0.01547',
       ABT: '0.07469',
       ABTC: '0.13559',
       ABY: '0.00124',
       ABYSS: '0.00632',
       ...

If the ID name is a currency beginning with a number or symbol, an underscore is  
added at the beginning of the name to make it easier to work with GraphQL.