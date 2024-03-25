
/**
 * Preloads ad data from the contract.
 */
export default async function preload() {
    const offer = await this.admin.getOffer(this.offerId);
    this.offer = offer;

    const ads = await this.admin.getValidatedAdsFromOfferId(this.offerId);
    const bps = await this.admin.getBPS();
    this.ads = ads;
    this.bps = bps;
}
