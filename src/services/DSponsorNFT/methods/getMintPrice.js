//                'function getMintPrice(uint256 tokenId, address currency) view returns (bool enabled, uint256 amount)',
export default async function getMintPrice(tokenId, currency) {
    return this.contract.getMintPrice(tokenId, currency);
}
