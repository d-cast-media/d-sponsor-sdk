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
    chain: new ChainNetwork({...}),// Custom chain network - default to Polygon Mumbai
    privateKey: 'your-private-key-here', // Optional for signing transactions
});


const renderer = dsponsorSDK.getAdSpaceRenderer({
    offerId: 23,// Offer ID to render
    selector: 'dsponsor_div',
    selection: 'grid 2x2'
});

//await renderer.connect(); // Connect to the signer (e.g., Metamask) for transactions (on browser)

await renderer.preload(); // Preload ad data

const container = renderer.render();
document.getElementById('dsponsor').appendChild(container);
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
    - [Creators - Quick start](https://d-cast-media.github.io/d-sponsor-sdk/#/getting-started/quickstart-for-creators)
        - [DSponsorSDK](https://d-cast-media.github.io/d-sponsor-sdk/#/getting-started/quickstart-for-creators#sdk)
        - [DSponsorNFT](https://d-cast-media.github.io/d-sponsor-sdk/#/getting-started/quickstart-for-creators#nft)
    - [Integrations - Quick start](https://d-cast-media.github.io/d-sponsor-sdk/#/getting-started/quickstart-for-integrations)
        - [SDK](https://d-cast-media.github.io/d-sponsor-sdk/#/getting-started/quickstart-for-integrations#sdk)
        - [Iframe Integration](https://d-cast-media.github.io/d-sponsor-sdk/#/getting-started/quickstart-for-integrations#iframe-integration)
        - [React Integration](https://d-cast-media.github.io/d-sponsor-sdk/#/getting-started/quickstart-for-integrations#react-integration)
        - [HTML Integration](https://d-cast-media.github.io/d-sponsor-sdk/#/getting-started/quickstart-for-integrations#html)
            - [With the SDK](https://d-cast-media.github.io/d-sponsor-sdk/#/getting-started/quickstart-for-integrations#with-the-sdk)
            - [Pure HTML](https://d-cast-media.github.io/d-sponsor-sdk/#/getting-started/quickstart-for-integrations#pure-html)
    - API Reference
        - [DSponsorSDK](https://d-cast-media.github.io/d-sponsor-sdk/#/api-reference/DSponsorSDK)
        - Primitives
            - [Ad](https://d-cast-media.github.io/d-sponsor-sdk/#/api-reference/primitives/Ad)
            - [ChainNetwork](https://d-cast-media.github.io/d-sponsor-sdk/#/api-reference/primitives/ChainNetwork)
            - [Token](https://d-cast-media.github.io/d-sponsor-sdk/#/api-reference/primitives/Token)
        - Services:
            - [AdSpaceRenderer](https://d-cast-media.github.io/d-sponsor-sdk/#/api-reference/services/AdSpaceRenderer)
            - [DSponsorAdmin](https://d-cast-media.github.io/d-sponsor-sdk/#/api-reference/services/DSponsorAdmin)
            - [DSponsorNFT](https://d-cast-media.github.io/d-sponsor-sdk/#/api-reference/services/DSponsorNFT)
        - Utils:
            - [convertABIToShortABI](https://d-cast-media.github.io/d-sponsor-sdk/#/api-reference/utils/convertABIToShortABI)
            - [generatePrivateKey](https://d-cast-media.github.io/d-sponsor-sdk/#/api-reference/utils/generatePrivateKey)
            - [isHexadecimal](https://d-cast-media.github.io/d-sponsor-sdk/#/api-reference/utils/isHexadecimal)
            - [isNumber](https://d-cast-media.github.io/d-sponsor-sdk/#/api-reference/utils/isNumber)
            - [stringToUint256](https://d-cast-media.github.io/d-sponsor-sdk/#/api-reference/utils/stringToUint256)
