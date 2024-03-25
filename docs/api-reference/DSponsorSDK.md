# DSponsorSDK API Reference

`DSponsorSDK` serves as an all-encompassing software development kit for interacting with the DSponsor ecosystem, which includes functionalities for ad sponsorship management, ad space rendering, and blockchain interactions. This SDK is designed to streamline the development process for applications utilizing DSponsor's decentralized advertisement solutions.

## Constructor

### `constructor({chain, privateKey} = {})`

Initializes a new instance of `DSponsorSDK`.

**Parameters:**

- `chain` (ChainNetwork): An instance of `ChainNetwork` specifying the blockchain network to connect to.
- `privateKey` (String, optional): A private key for signing transactions. If not provided, a new private key is generated.

## Methods


### `getDSponsorAdmin()`

Retrieves the DSponsorAdmin contract instance associated with the SDK instance. This contract is used for managing ad sponsorship and other administrative tasks.

**Returns:**

new DSponsorAdmin

### `getSigner()`

Retrieves the ethers.js signer object associated with the SDK instance. This signer is used for signing transactions and interacting with smart contracts on the blockchain.

**Returns:**

- (ethers.Signer): The signer object.

### `static generatePrivateKey()`

A static method to generate a new private key. This can be used for creating new blockchain accounts or for testing purposes.

**Returns:**

- (String): A newly generated private key.

### `approve({currency, amount})`

Approves a specified amount of a cryptocurrency or token to be spent by the DSponsorAdmin contract. This is a necessary step before executing transactions that require a transfer of tokens, such as posting ads.

**Parameters:**

- `currency` (String): The address of the token contract.
- `amount` (String or Number): The amount of the currency to approve.

**Returns:**

- A promise that resolves to the transaction receipt of the approval transaction.


### `getAdSpaceRenderer({address, selector, selection})`

Creates a new `AdSpaceRenderer` instance with the specified contract address, DOM selector, and selection criteria. This method is a convenient way to generate an ad space renderer for a specific ad space on a web page.

**Parameters:**

- `address` (String): The address of DSponsorAdmin contract.
- `selector` (String): The DOM selector for the ad space element.
- `selection` (String): The selection criteria for displaying ads. - 
- `signer` (Signer): The signer for the DSponsorAdmin contract. - default to signer from SDK
- `chain` (ChainNetwork): The chain instance for DSponsorAdmin contract. - default to chain from SDK


## Usage Example

```javascript
import DSponsorSDK from './DSponsorSDK.js';

// Initialize the SDK with the desired blockchain network and an optional private key
const sdk = new DSponsorSDK({
    chain: 'mainnet', // or your preferred network
    privateKey: 'your_private_key_here' // optional
});

// Generate a new private key (optional use)
const newPrivateKey = DSponsorSDK.generatePrivateKey();

// Approve a token amount for DSponsorAdmin contract to spend
await sdk.approve({
    currency: '0xTokenContractAddress',
    amount: '1000000000000000000' // For example, 1 token (assuming 18 decimals)
});

// Get an ad space renderer (see AdSpaceRenderer API Reference)
const adSpaceRenderer = sdk.getAdSpaceRenderer({
    selector: 'ad-container',
    selection: 'grid 2x4'
});
```
