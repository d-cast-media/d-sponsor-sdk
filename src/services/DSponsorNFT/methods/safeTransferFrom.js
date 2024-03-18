export default function safeTransferFrom(from, to, tokenId, data = "") {
    return this.contract.safeTransferFrom(from, to, tokenId, data);
}
