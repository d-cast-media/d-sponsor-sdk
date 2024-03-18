export default function mint(tokenId, to, currency, tokenData) {
    return this.contract.mint(tokenId, to, currency, tokenData);
}
