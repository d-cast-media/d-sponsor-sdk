export default function getApproved(tokenId) {
    return this.contract.getApproved(tokenId);
}
