export default function getOwnerOf(tokenId) {
    return this.contract.ownerOf(tokenId);
}
