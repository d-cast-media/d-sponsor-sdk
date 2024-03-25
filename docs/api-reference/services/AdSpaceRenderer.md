# AdSpaceRenderer API Reference

`AdSpaceRenderer` is a class designed to facilitate the rendering of advertising spaces using NFT contracts for ad data. It simplifies integrating blockchain-based advertisements into web interfaces by selecting and displaying ads according to specified criteria in a dynamic and visually appealing grid layout.

## Constructor

### `constructor(props)`

Initializes a new instance of `AdSpaceRenderer`, setting up the environment for ad rendering based on Offer data.

**Parameters:**

- `props` (Object): Initialization properties.
  - `props.address` (String): The contract address of the DSponsorAdmin contract.
  - `props.selector` (String): The DOM selector for the ad space element. This selector will be used to find the container element where ads will be rendered.
  - `props.selection` (String): The selection criteria for displaying ads. Supports formats like 'random 1', 'grid 2x2' to indicate how ads should be selected and organized.
  - `props.signer` (Signer): The signer for the DSponsorAdmin contract.
  - `props.chain` (ChainNetwork): The chain instance for DSponsorAdmin contract.

## Methods

### `preload()`

Fetches ad data from the specified contract address, preparing the ads for rendering. This method retrieves the necessary information to display ads in the selected format.

**Returns:**

- (Promise): A promise that resolves when the ad data has been successfully fetched and processed.

### `connect()`

Called before preload, allows to get signer from provider and associate for transaction support

**Returns:**

- (Promise): A promise that resolves when the connection has been successfully established.

### `select(selection)`

Selects ads based on the provided selection criteria. The method supports two formats: 'random <count>' and 'grid <rows>x<cols>'. When using the 'grid' format, the function will fill empty slots with placeholders to maintain the specified layout.

**Parameters:**

- `selection` (String): Selection criteria in the format 'random <count>' or 'grid <rows>x<cols>'.

**Returns:**

- (Array): An array of selected ads, including placeholders if necessary.

### `render(options)`

Dynamically renders the selected ads into the specified DOM element, applying a grid layout. This method handles the creation and styling of ad elements, including making ads clickable when applicable.

**Parameters:**

- `options` (Object): Options for rendering the ads.
  - `options.theme` (String): The theme for the ad space (e.g., 'blue') - default to none allowing for custom styling.
  - `options.tokenData` (String): The token data for the ad space (for the onClick event) 
  - `options.referral` (String): The referral code for the ad space (for the onClick event) - default to 'dsponsor'.

**Returns:**

- (HTMLElement): The newly created div element containing the ad.


### `static fromOffer(offerId, props)`

Creates an `AdSpaceRenderer` instance from an offer ID, setting up the environment for ad rendering based on the specified offer.

**Parameters:**

- `offerId` (Number): The ID of the offer to render.
- `props` (Object): Additional properties to set on the renderer.
  - `props.selector` (String): The DOM selector for the ad space element. This selector will be used to find the container element where ads will be rendered.
  - `props.selection` (String): The selection criteria for displaying ads. Supports formats like 'random 1', 'grid 2x2' to indicate how ads should be selected and organized.
  - `props.referral` (String): The referral code for the ad space (for the onClick event) - default to 'dsponsor'.

**Returns:**

- (AdSpaceRenderer): A new instance of `AdSpaceRenderer` initialized with the specified offer ID and properties.



## Usage Example

```javascript
import { AdSpaceRenderer } from "@dsponsor/sdk";

// Initialize AdSpaceRenderer with contract address and DOM selector
const adRenderer = new AdSpaceRenderer({
    address: 'DSponsorAdmin contract address',
    selector: 'dsponsor_div',
    selection: 'grid 2x2'
});

// Allow to connect a signer (e.g. Metamask) for transaction support
await adRenderer.connect();

// Fetch ad data
await adRenderer.preload();

// Display ads in a grid within the specified container
const container = adRenderer.render();
```
