export default function getIsApprovedForAll(owner, operator) {
    return this.contract.isApprovedForAll(owner, operator);
}
