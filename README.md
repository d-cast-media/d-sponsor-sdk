### DSponsor SDK

DSponsor SDK is a library that allows you to easily integrate DSponsor into your app.

It facilitates the creation, management, and interaction with smart contracts for advertising and sponsorship.

Uses the Ethereum library ethers.js.

### CDN :

```html
<script src="https://unpkg.com/@dsponsor/sdk"></script>
```

### HTML example :

```html
<html>
<head>
    <title>Home</title>
    <script type="module">
        import { AdSpaceRenderer } from 'https://unpkg.com/@dsponsor/sdk';
        const sponsoredItem = AdSpaceRenderer.fromOffer(23, {
            selector: 'dsponsor',
        })
        await sponsoredItem.connect();
        console.log('Connected to the contract');
        await sponsoredItem.preload();
        const container = sponsoredItem.render({theme: 'blue'});
        document.getElementById('dsponsor').appendChild(container );
    </script>
</head>
<body>
<div id="dsponsor"></div>
</body>
</html>
```

#### Quick Start

```js
import DSponsorSDK from '@dsponsor/sdk';

// Initialize with default settings (Polygon Mumbai)
// Will use a new private key if not provided
const dsponsorSDK = new DSponsorSDK();

// For custom configuration, pass the desired chain and private key
const customDsponsorSDK = new DSponsorSDK({
    chain: {
        chainName: 'ethereum-sepolia', // Example for Sepolia testnet
        rpc: 'https://sepolia.infura.io/v3/{infura_project_id}',
    },
    privateKey: 'your-private-key-here',
});
```

After initializing DSponsorSDK, you can interact with the DSponsor ecosystem:

```js
// Get the address of the DSponsorAdmin contract
const dsponsorAdmin = dsponsorSDK.getDSponsorAdmin();
// Example: Fetching the base point share (BPS) value
async function fetchBPS() {
    const bps = await dsponsorAdmin.getBPS();
    console.log(`Current BPS: ${bps}`);
}

fetchBPS();
```

### API Reference

- Getting started
    - [Creators - Quick start](getting-started/quickstart-for-creators.md)
        - [DSponsorSDK](getting-started/quickstart-for-creators#sdk.md)
        - [DSponsorNFT](getting-started/quickstart-for-creators#nft.md)
    - [Integrations - Quick start](getting-started/quickstart-for-integrations.md)
        - [SDK](getting-started/quickstart-for-integrations.md#sdk)
        - [Iframe Integration](getting-started/quickstart-for-integrations.md#iframe-integration)
        - [React Integration](getting-started/quickstart-for-integrations.md#react-integration)
        - [HTML Integration](getting-started/quickstart-for-integrations.md#html)
            - [With the SDK](getting-started/quickstart-for-integrations.md#with-the-sdk)
            - [Pure HTML](getting-started/quickstart-for-integrations.md#pure-html)


[//]: # (- Getting started)

[//]: # (    - [Creators - Quick start]&#40;getting-started/quickstart-for-creators.md&#41;)

[//]: # (        - [DSponsorSDK]&#40;getting-started/quickstart-for-creators#sdk.md&#41;)

[//]: # (        - [DSponsorNFT]&#40;getting-started/quickstart-for-creators#nft.md&#41;)

[//]: # (    - [Integrations - Quick start]&#40;getting-started/quickstart-for-integrations.md&#41;)

[//]: # (        - [SDK]&#40;getting-started/quickstart-for-integrations.md#sdk&#41;)

[//]: # (        - [Iframe Integration]&#40;getting-started/quickstart-for-integrations.md#iframe-integration&#41;)

[//]: # (        - [React Integration]&#40;getting-started/quickstart-for-integrations.md#react-integration&#41;)

[//]: # (        - [HTML Integration]&#40;getting-started/quickstart-for-integrations.md#html&#41;)

[//]: # (            - [With the SDK]&#40;getting-started/quickstart-for-integrations.md#with-the-sdk&#41;)

[//]: # (            - [Pure HTML]&#40;getting-started/quickstart-for-integrations.md#pure-html&#41;)

[//]: # (    - API Reference)

[//]: # (        - [DSponsorSDK]&#40;api-reference/DSponsorSDK.md&#41;)

[//]: # (        - Primitives)

[//]: # (            - [Ad]&#40;api-reference/primitives/Ad.md&#41;)

[//]: # (            - [ChainNetwork]&#40;api-reference/primitives/ChainNetwork.md&#41;)

[//]: # (            - [Token]&#40;api-reference/primitives/Token.md&#41;)

[//]: # (        - Services:)

[//]: # (            - [AdSpaceRenderer]&#40;api-reference/services/AdSpaceRenderer.md&#41;)

[//]: # (            - [DSponsorAdmin]&#40;api-reference/services/DSponsorAdmin.md&#41;)

[//]: # (            - [DSponsorNFT]&#40;api-reference/services/DSponsorNFT.md&#41;)

[//]: # (        - Utils:)

[//]: # (            - [convertABIToShortABI]&#40;api-reference/utils/convertABIToShortABI.md&#41;)

[//]: # (            - [generatePrivateKey]&#40;api-reference/utils/generatePrivateKey.md&#41;)

[//]: # (            - [isHexadecimal]&#40;api-reference/utils/isHexadecimal.md&#41;)

[//]: # (            - [isNumber]&#40;api-reference/utils/isNumber.md&#41;)

[//]: # (            - [stringToUint256]&#40;api-reference/utils/stringToUint256.md&#41;)
