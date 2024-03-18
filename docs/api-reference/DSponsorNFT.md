# DSponsorNFT API Reference

The `DSponsorNFT` class provides a powerful interface for interacting with DSponsor NFT contracts on the Ethereum blockchain.  
It enables a wide range of operations related to NFTs, such as minting, transferring, and querying NFT data, making it an essential tool for developers working with NFTs in advertising or sponsorship contexts.

## Constructor

### `constructor({address, privateKey, chain} = {})`

Initializes a new instance of the `DSponsorNFT` class.

**Parameters:**

- `address` (String): The smart contract address of the DSponsor NFT.
- `privateKey` (String, optional): A private key to sign transactions. If not provided, a new private key is generated.
- `chain` (ChainNetwork): The blockchain network to interact with.

## Methods

### Token Management

- `approve(to, tokenId)`: Approves another account to transfer the specified token ID.
- `getApproved(tokenId)`: Returns the account approved to transfer the specified token ID.
- `getBalanceOf(owner)`: Returns the number of tokens owned by the specified account.
- `getOwnerOf(tokenId)`: Returns the owner of the specified token ID.
- `mint(tokenId, to, currency, tokenData)`: Mints a new token to the specified account.
- `safeTransferFrom(from, to, tokenId)`: Safely transfers a token from one account to another.
- `transferFrom(from, to, tokenId)`: Transfers a token from one account to another.
- `transferOwnership(newOwner)`: Transfers ownership of the contract to a new account.

### Querying

- `getAds()`: Retrieves ads associated with the NFTs.
- `getIsApprovedForAll(owner, operator)`: Checks if an operator is approved to manage all of the owner's tokens.
- `getMaxSupply()`: Returns the maximum supply of tokens.
- `getName()`: Returns the name of the token collection.
- `getOwnerAddress()`: Returns the contract owner's address.
- `getSymbol()`: Returns the token symbol.
- `getTokenURI(tokenId)`: Returns the token URI for the specified token ID.
- `getTokenURIs()`: Returns the token URIs for all tokens.
- `getTotalSupply()`: Returns the total number of tokens in existence.

### Configuration

- `setApprovalForAll(operator, approved)`: Sets or unsets an operator as approved for all of the sender's tokens.
- `setBaseURI(baseURI)`: Sets the base URI for all token IDs in the contract.
- `setContractURI(contractURI)`: Sets the contract URI.
- `supportsInterface(interfaceId)`: Returns true if the contract implements an interface.

## Usage Example

```javascript
const nft = new DSponsorNFT({
    address: "0x5c8cfe4d7677878738cca448e4708af61311ef16",
    privateKey: "your_private_key",
    chain: "mainnet" // Specify the blockchain network
});
```
