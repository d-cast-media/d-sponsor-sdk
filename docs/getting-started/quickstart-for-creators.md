## Quick Start for Creators

Creating and selling NFTs for sponsorship is the proud approach enabled by the DSponsor ecosystem.  
This quick start guide will help creators looking to mint NFTs and integrate them for sponsorship opportunities.

### Setting Up the SDK

Before interacting with the DSponsor ecosystem, you'll need to set up the DSponsorSDK.  
This SDK simplifies interactions with smart contracts for NFT creation, management, and sponsorship transactions.

```javascript
import DSponsorSDK from '@dsponsor/sdk';

// Initialize with default settings (e.g., Polygon Mumbai)
const dsponsorSDK = new DSponsorSDK();

// For custom blockchain configurations, specify the chain details and your private key
const customDsponsorSDK = new DSponsorSDK({
    chain: 'ethereum-sepolia', // Example: Sepolia testnet
    rpc: 'https://sepolia.infura.io/v3/{infura_project_id}',
    privateKey: 'your-private-key-here',
});
```

### Interacting with the DSponsor Ecosystem

With the SDK initialized, you can begin interacting with the DSponsor ecosystem, such as querying contract addresses and fetching key parameters.

```javascript
// Accessing the DSponsorAdmin contract address
const dsponsorAdmin = dsponsorSDK.getDSponsorAdmin();
console.log(`DSponsorAdmin Address: ${dsponsorAdmin.address}`);

// Fetching the Base Point Share (BPS) value
async function fetchBPS() {
    const bps = await dsponsorAdmin.getBPS();
    console.log(`Current BPS: ${bps}`);
}

fetchBPS();
```

### Initializing the DSponsorNFT Contract

To create and manage NFTs for sponsorship, initialize the DSponsorNFT contract interface.

```javascript
import DSponsorNFT from "@dsponsor/sdk";

const nft = new DSponsorNFT({
    address: "0xContractAddressHere"
});

// Retrieving the DSponsorNFT contract address
console.log(`DSponsorNFT Address: ${nft.address}`);
```

### Minting NFTs for Sponsorship

Minting NFTs on the DSponsor platform involves specifying details such as token ID, recipient, and ad content. Here's how you can mint an NFT tailored for sponsorship:

```javascript
// Define the value to be sent with the mint transaction (including any fees)
const valuePrice = ethers.utils.parseEther('1'); // Example: 1 ETH
const dsponsorAdmin = dsponsorSDK.getDSponsorAdmin();
const bps = await dsponsorAdmin.getBPS(); // Fetch current BPS
const fee = (valuePrice * BigInt(bps)) / BigInt(10000); // Calculate fee based on BPS
const feeAndValue = valuePrice + fee; // Total value including the fee

// Minting parameters
const mintParams = {
    tokenId: 5,
    to: "recipientWalletAddress",
    currency: "0xCurrencyContractAddress", // e.g: ChainNetwork.getCurrencyAddress('USDC')
    tokenData: 'Base64EncodedTokenData',
    offerId: 14,
    // by default, image are 1x1
    adParameters: ['imageURL', 'linkURL'],
    adDatas: ['http://example.com/logo.png', 'http://example.com'],
    referralAdditionalInformation: 'OptionalReferralInfo'
};

// Mint the NFT
const mintTx = await dsponsorAdmin.mintAndSubmit(mintParams, {
    value: feeAndValue.toString()
});

console.log(`Mint Transaction Hash: ${mintTx.hash}`);
```

### After Minting

Once minted, your NFTs are ready for sponsorship within the DSponsor ecosystem. Utilize the DSponsorSDK to manage your NFTs, track sponsorships, and engage with sponsors effectively.
