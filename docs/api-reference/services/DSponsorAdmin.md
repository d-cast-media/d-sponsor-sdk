# DSponsorAdmin API Reference

`DSponsorAdmin` is a comprehensive administrative interface for managing ad sponsorships, including NFT creation, offer management, proposal review, and protocol configuration. This class leverages the Ethereum blockchain for decentralized ad management.

## Constructor

### `constructor({address, signer})`

Initializes a new instance of the `DSponsorAdmin` class.

**Parameters:**

- `address` (String): The smart contract address of the DSponsor system.
- `signer` (ethers.Signer): An ethers.js signer object representing the administrator or operator of the contract.

## Methods

### `createDSponsorNFTAndOffer(nftParams, offerParams)`

Creates a new DSponsor NFT and associated offer with the specified parameters.

**Parameters:**

- `nftParams` (Object): Configuration for the NFT to be created.
- `offerParams` (Object): Configuration for the offer associated with the NFT.

### `createOffer(nftContract, offerParams)`

Creates a new offer associated with an existing DSponsor NFT.

**Parameters:**

- `nftContract` (String): The address of the NFT contract.
- `offerParams` (Object): Configuration for the offer.

### `getBPS()`

Retrieves the current basis points (bps) for the protocol fee.

**Returns:**

- `uint96`: The current basis points for the protocol fee.

### `getCurrentTrustedForwarder()`

Gets the current trusted forwarder address for the contract.

**Returns:**

- `String`: The address of the current trusted forwarder.

### `getNFTFactoryContractAddress()`

Retrieves the contract address of the NFT factory associated with this DSponsor system.

**Returns:**

- `String`: The NFT factory contract address.


### `getAdProposal(query)`

Retrieves an ad proposal by its proposal ID.

**Parameters:**

- `query` (Object): The query object.
  - `proposalId` (String): The ID of the proposal. (Optional)
  - `offerId` (String): The ID of the offer. (Optional)

**Returns:**

- `Object`: The ad proposal details.
  - `offerId` (String): The ID of the offer.
  - `tokenId` (String): The ID of the token.
  - `records` (Object): The proposal records.

**Example:**

```javascript
const proposal = await admin.getAdProposal({ proposalId: 'PROPOSAL_ID' });
```

### `getAdProposals(query)`

Retrieves ad proposals based on the specified query.

**Parameters:**

- `query` (Object): The query object.
  - `offerId` (String): The ID of the offer.

**Returns:**

- `Promise<null|Ad[]>`: A promise that resolves with the ad proposals.


### `getAllowedTokens(query)`

Retrieves all allowed tokens for a specific offer.

**Parameters:**

- `query` (Object): The query object.
  - `id` (String): The ID of the offer.

**Returns:**

- `Promise<Object[]>`: A promise that resolves with the allowed tokens.
  - `id` (String): The ID of the offer.
  - `tokenId` (String): The token ID.
  - `allowed` (Boolean): Whether the token is allowed.
  - `transactionHash` (String): The transaction hash of the offer.


### `getMintPrices(query)`

Retrieves the mint prices for a specific offer.

**Parameters:**

- `query` (Object): The query object.
  - `id` (String): The ID of the offer.

**Returns:**

- `Promise<Object[]>`: A promise that resolves with the mint prices.
  - `id` (String): The ID of the offer.
  - `amount` (String): The amount of the price.
  - `currency` (String): The currency of the price.
  - `enabled` (Boolean): Whether the price is enabled.
  - `blockNumber` (Number): The block number of the price.
  - `blockTimestamp` (Number): The block timestamp of the price.
  - `transactionHash` (String): The transaction hash of the price.

### `getOffer(query)`

Retrieves the details of a specific offer.

**Parameters:**

- `query` (Object): The query object.
  - `offerId` (String): The ID of the offer.

**Returns:**

- `Promise<Object>`: A promise that resolves with the offer details.
  - `queryableId` (String): The queryable ID of the offer.
  - `disable` (Boolean): Whether the offer is disabled.
  - `nftContract` (String): The address of the NFT contract.
  - `allowedTokens` (String[]): An array of allowed tokens.
  - `name` (String): The name of the offer.
  - `offerId` (String): The ID of the offer.
  - `rulesURI` (String): The URI for the offer's rules.
  - `id` (String): The ID of the offer.
  - `maxSupply` (Number): The maximum supply of the offer.
  - `prices` (String[]): An array of prices.
  - `currencies` (String[]): An array of currencies.

### `getOfferContract(offerId)`

Gets the contract address for a specific offer.

**Parameters:**

- `offerId` (uint256): The ID of the offer.

**Returns:**

- `String`: The contract address of the offer.

### `getOfferProposals(offerId, tokenId, adParameter)`

Retrieves proposals for a specific offer, token, and advertisement parameter.

**Parameters:**

- `offerId` (uint256): The ID of the offer.
- `tokenId` (uint256): The token ID.
- `adParameter` (String): The advertisement parameter.

**Returns:**

- `Object[]`: An array of proposals.


### `getOffers()`

Retrieves all offers managed by the DSponsor system.

**Returns:**

- `Object[]`: An array of offers.
  - `offerId` (String): The ID of the offer.
  - `id` (String): The ID of the offer.
  - `disable` (Boolean): Whether the offer is disabled.
  - `name` (String): The name of the offer.
  - `rulesURI` (String): The URI for the offer's rules.
  - `nftContract` (String): The address of the NFT contract.
  - `blockNumber` (Number): The block number of the offer.
  - `blockTimestamp` (Number): The block timestamp of the offer.
  - `transactionHash` (String): The transaction hash of the offer.

Note: The `getOffers` method misses the `maxSupply`, `prices`, and `currencies` fields.  
Use the `getOffer` method to get the full details of a specific offer.


### `getOffersAdmin(query)`

Retrieves all offers associated to a specific admin.

**Parameters:**

- `query` (Object): The query object.
  - `address` (String): The address of the admin.

**Returns:**

- `Promise<Object[]>`: A promise that resolves with the offers update admins data associated to the admin.



### `getOwnerAddress()`

Retrieves the owner address of the contract.

**Returns:**

- `String`: The owner address of the contract.

### `getPendingAds(query)`

Retrieves pending ads based on the specified query.

**Parameters:**

- `query` (Object): The query object.
  - `offerId` (String): The ID of the offer.

**Returns:**

- `Promise<null|Ad[]>`: A promise that resolves with the pending ads.


### `getRecipientAddress()`

Retrieves the recipient address for the protocol fee.

**Returns:**

- `String`: The recipient address for the protocol fee.


### `getRejectedAds(query)`

Retrieves rejected ads based on the specified query.

**Parameters:**

- `query` (Object): The query object.
  - `offerId` (String): The ID of the offer.

**Returns:**

- `Promise<null|Ad[]>`: A promise that resolves with the rejected ads.


### `getSwapRouterAddress()`

Retrieves the address of the swap router.

**Returns:**

- `String`: The address of the swap router.


### `getValidatedAds(query)`

Retrieves validated ads based on the specified query.

**Parameters:**

- `query` (Object): The query object.
  - `offerId` (String): The ID of the offer.

**Returns:**

- `Promise<null|Ad[]>`: A promise that resolves with the validated ads.


### `isAllowedAdParameter(offerId, adParameter)`

Checks if an advertisement parameter is allowed for a specific offer.

**Parameters:**

- `offerId` (uint256): The ID of the offer.
- `adParameter` (String): The advertisement parameter.

**Returns:**

- `Boolean`: True if allowed, false otherwise.

### `isOfferAdmin(offerId, admin)`

Checks if the specified address is an admin for the offer.

**Parameters:**

- `offerId` (uint256): The ID of the offer.
- `admin` (String): The address to check.

**Returns:**

- `Boolean`: True if the address is an admin, false otherwise.

### `isOfferDisabled(offerId)`

Determines if an offer is currently disabled.

**Parameters:**

- `offerId` (uint256): The ID of the offer.

**Returns:**

- `Boolean`: True if the offer is disabled, false otherwise.

### `mintAndSubmit(params)`

Mints a new token and submits an ad proposal in one transaction.

**Parameters:**

- `params` (Object): Parameters for minting and submitting the ad proposal.

### `reviewAdProposal(offerId, tokenId, proposalId, adParameter, validated, reason)`

Reviews and validates an ad proposal.

**Parameters:**

- `offerId` (uint256): The ID of the offer.
- `tokenId` (uint256): The token ID.
- `proposalId` (uint256): The proposal ID.
- `adParameter` (String): The advertisement parameter.
- `validated` (Boolean): Whether the proposal is validated.
- `reason` (String): The reason for validation or rejection.

### `setTrustedForwarder(forwarder)`

Sets the trusted forwarder address for the contract.

**Parameters:**

- `forwarder` (String): The address of the trusted forwarder.

### `submitAdProposal(offerId, tokenId, adParameter, data)`

Submits an ad proposal for a specific offer and token.

**Parameters:**

- `offerId` (uint256): The ID of the offer.
- `tokenId` (uint256): The token ID.
- `adParameter` (String): The advertisement parameter.
- `data` (String): The data for the ad proposal.

### `transferOwnership(newOwner)`

Transfers ownership of the contract to a new address.

**Parameters:**

- `newOwner` (String): The address of the new owner.

### `updateOffer(offerId, disable, name, rulesURI, addOptions, removeOptions)`

Updates the configuration of an existing offer.

**Parameters:**

- `offerId` (uint256): The ID of the offer.
- `disable` (Boolean): Whether the offer should be disabled.
- `name` (String): The new name of the offer.
- `rulesURI` (String): The new URI for the offer's rules.
- `addOptions` (Object): Options to add to the offer.
- `removeOptions` (Object): Options to remove from the offer.

### `updateProtocolFee(recipient, bps)`

Updates the protocol fee and recipient.

**Parameters:**

- `recipient` (String): The address of the fee recipient.
- `bps` (uint96): The new basis points for the protocol fee.

## Errors and Events

The `DSponsorAdmin` contract includes several errors for handling exceptions and events for monitoring contract activities. Refer to the source code for a complete list of errors and events.

## Usage Example

```javascript
import DSponsorAdmin from './DSponsorAdmin.js';

const admin = new DSponsorAdmin({
  address: 'CONTRACT_ADDRESS',
  signer: signerInstance
});

// Example usage: Creating an offer
const offerParams = {
  nftContract: 'NFT_CONTRACT_ADDRESS',
  offerParams: {
    name: 'Example Offer',
    rulesURI: 'http://example.com/rules',
    options: {
      admins: ['ADMIN_ADDRESS'],
      validators: ['VALIDATOR_ADDRESS'],
      adParameters: ['param1', 'param2']
    }
  }
};

await admin.createOffer(offerParams);
