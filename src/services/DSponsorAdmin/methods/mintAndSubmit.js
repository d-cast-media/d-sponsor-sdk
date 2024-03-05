//                'function mintAndSubmit((uint256 tokenId, address to, address currency, string tokenData, uint256 offerId, string[] adParameters, string[] adDatas, string referralAdditionalInformation) params) payable',
export default function mintAndSubmit(params, opts) {
    return this.contract.mintAndSubmit(params, opts)
}
