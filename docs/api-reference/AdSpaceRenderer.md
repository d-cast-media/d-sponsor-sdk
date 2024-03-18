# AdSpaceRenderer API Reference

`AdSpaceRenderer` is a class designed to facilitate the rendering of advertising spaces using NFT contracts for ad data. It simplifies integrating blockchain-based advertisements into web interfaces by selecting and displaying ads according to specified criteria in a dynamic and visually appealing grid layout.

## Constructor

### `constructor(props)`

Initializes a new instance of `AdSpaceRenderer`, setting up the environment for ad rendering based on NFT data.

**Parameters:**

- `props` (Object): Initialization properties.
  - `props.contract` (String): The contract address of the DSponsor NFT.
  - `props.selector` (String): The DOM selector for the ad space element. This selector will be used to find the container element where ads will be rendered.
  - `props.selection` (String): The selection criteria for displaying ads. Supports formats like 'random 1', 'grid 2x2' to indicate how ads should be selected and organized.

## Methods

### `preload()`

Asynchronously preloads ad data from the NFT contract. This method fetches ad details and prepares them for rendering. This includes obtaining the total supply of ads and individual ad data.

### `select(selection)`

Selects ads based on the provided selection criteria, determining which ads will be displayed and how they will be arranged.

**Parameters:**

- `selection` (String): Specifies how ads should be selected and organized. The format includes the selection type ('random', 'grid') and count (e.g., '1', '2x2').

**Returns:**

- (Array): An array of ads selected according to the provided criteria, ready for rendering.

### `render()`

Dynamically renders the selected ads into the specified DOM element, applying a grid layout. This method handles the creation and styling of ad elements, including making ads clickable when applicable.

**Enhancements:**
- Ads are displayed in a grid pattern, with the layout being adjustable via the `selection` criteria.
- The entire ad area acts as a clickable link if the ad includes a URL, enhancing user interaction.
- Default styles are applied to ensure a visually appealing presentation, but these can be customized as needed.

### `static fromContract(contract, props = {})`

Facilitates the creation of an `AdSpaceRenderer` instance using only a contract address. This static method simplifies the initialization process, automatically setting up the renderer with a predefined or custom configuration.

**Parameters:**

- `contract` (String): The address of the DSponsor NFT contract.
- `props` (Object, optional): Additional properties to further customize the renderer, such as `selector` and `selection`.

**Returns:**

- `AdSpaceRenderer`: A configured instance ready for ad data fetching and rendering.

## Usage Example

```javascript
import { AdSpaceRenderer } from "@dsponsor/sdk";

// Initialize AdSpaceRenderer with contract address and DOM selector
const adRenderer = new AdSpaceRenderer({
    contract: '0xYourContractAddressHere',
    selector: 'ad-container-id',
    selection: 'grid 2x2'
});

// Fetch ad data
await adRenderer.preload();

// Display ads in a grid within the specified container
adRenderer.render();
```
