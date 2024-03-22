
/**
 * Preloads ad data from the contract.
 */
export default async function preload() {
    const supply = await this.contract.getTotalSupply();
    this.supply = supply;
    const maxSupply = await this.contract.getMaxSupply();
    this.maxSupply = maxSupply;
    console.log(`Supply: ${supply} / ${maxSupply}`);
    const ads = await this.contract.getAds();
    this.ads = ads;
    const offerId = await this.contract.getOfferId();
    this.offerId = offerId;
}
