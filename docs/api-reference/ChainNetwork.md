# ChainNetwork API Reference

`ChainNetwork` is a class designed to abstract the complexities of interacting with different blockchain networks. It provides essential information and utilities for connecting to blockchains, managing contracts, and handling assets.

## Constructor

### `constructor({ rpc, chainName, contracts, chainId, assets } = {})`

Initializes a new instance of `ChainNetwork` with configuration details.

**Parameters:**

- `rpc` (String, optional): The RPC URL of the blockchain network.
- `chainName` (String, optional): The name of the blockchain network.
- `contracts` (Object, optional): A mapping of contract names to their addresses.
- `chainId` (Number, optional): The chain ID of the blockchain network.
- `assets` (Object, optional): A mapping of asset symbols to their addresses.

## Methods

### `getCurrencyAddress(currencySymbol)`

Returns the address of a currency given its symbol.

**Parameters:**

- `currencySymbol` (String): The symbol of the currency.

**Returns:**

- (String): The address of the currency.

### `getCurrencyDecimals(currencySymbol)`

Returns the number of decimals for a given currency symbol.

**Parameters:**

- `currencySymbol` (String): The symbol of the currency.

**Returns:**

- (Number): The number of decimals for the currency. Defaults to 18, with an exception for USDC, which is 6.

## Usage Example

```javascript
import ChainNetwork from './ChainNetwork.js';

const chainNetwork = new ChainNetwork({
    chainName: 'polygon-mumbai',
});

const usdcAddress = chainNetwork.getCurrencyAddress('USDC');
console.log(`USDC Address on ${chainNetwork.chainName}: ${usdcAddress}`);
```
