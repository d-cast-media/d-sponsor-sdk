# Token API Reference

`Token` is a basic class for representing tokens on blockchain networks. It captures essential properties such as the token's name and the chain it resides on.

## Constructor

### `constructor({chainName, tokenName} = {})`

Initializes a new instance of `Token`.

**Parameters:**

- `chainName` (String, optional): The name of the blockchain network the token is on. Defaults to 'Unknown'.
- `tokenName` (String, optional): The name of the token. Defaults to 'Unknown'.

## Methods

### `toString()`

Provides a string representation of the Token instance.

**Returns:**

- (String): A string in the format `<Token[chainName]: tokenName>`.

## Usage Example

```javascript
import Token from './Token.js';

const token = new Token({
    chainName: 'polygon-mumbai',
    tokenName: 'USDC',
});

console.log(token.toString()); // Outputs: <Token[polygon-mumbai]: USDC>
```
