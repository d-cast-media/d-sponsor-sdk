# Ad API Reference

The `Ad` class in JavaScript is designed to manage and represent advertising content with flexibility and extensibility. This class allows for the handling of various ad types and formats by defining a structured yet adaptable approach to ad records management.

## Constructor

### `constructor({ offerId, tokenId })`

Initializes a new instance of the `Ad` class.

**Parameters:**

- `offerId` (String): The identifier for the offer associated with the ad.
- `tokenId` (String): The unique identifier of the token representing the ad.

## Methods

### `addRecord({ provider, kind, ratio, size, value })`

Adds a new record to the ad's details.

**Parameters:**

- `provider` (String, optional): The provider of the ad content (e.g., a social media platform, an ad network).
- `kind` (String): The type of ad content (e.g., `linkURL`, `imageURL`, `imageBase64`).
- `ratio` (String, optional): The aspect ratio for visual content. (e.g., `imageURL-1x1`, `imageURL-16x9`). 1x1 is assumed if not provided.
- `size` (String, optional): The size category of the content. (e.g., `imageURL-XL`, `imageURL-S`)
- `value` (String): The actual content or value of the ad record (e.g., URL, image path). (e.g., `https://example.com`, `data:image/png;base64,...`).

### `getRecord({ provider, kind, ratio, size })`

Retrieves a record from the ad based on the specified criteria.

**Parameters:**

- `provider` (String, optional): The provider of the ad content.
- `kind` (String): The type of ad content.
- `ratio` (String, optional): The aspect ratio for visual content.
- `size` (String, optional): The size category of the content.

**Returns:**

- The value of the ad record that matches the specified criteria.

### `generateKey({ provider, kind, ratio, size })`

Generates a deterministic key based on the ad record components.

**Parameters:**

- `provider` (String, optional): The provider of the ad content.
- `kind` (String): The type of ad content.
- `ratio` (String, optional): The aspect ratio for visual content.
- `size` (String, optional): The size category of the content.

**Returns:**

- (String): A deterministic key used to identify the ad record.

### `serialize()`

Serializes the `Ad` instance to a JSON string for storage or transmission.

**Returns:**

- (String): A JSON string representation of the `Ad` instance.

### `static deserialize(adString)`

Deserializes a JSON string to an `Ad` instance.

**Parameters:**

- `adString` (String): The JSON string representation of an `Ad` instance.

**Returns:**

- An instance of `Ad` reconstructed from the JSON string.

## Usage Example

```javascript
import Ad from './Ad.md';

// Initialize an ad instance
const ad = new Ad({offerId: "123", tokenId: "456"});

// Add a link URL record
ad.addRecord({kind: "linkURL", value: "https://example.com"});

// Add an image URL record
ad.addRecord({kind: "imageURL", ratio: "1x1", size: "XL", value: "https://cdn.example.com/ad.jpg"});

// Retrieve the link record
const link = ad.getRecord({kind: "linkURL"});
console.log(link); // Outputs: https://example.com

// Serialize the ad
const serializedAd = ad.serialize();

// Deserialize the ad
const deserializedAd = Ad.deserialize(serializedAd);
console.log(deserializedAd.getRecord({kind: "imageURL", ratio: "1x1", size: "XL"}));
// Outputs: https://cdn.example.com/ad.jpg
```
