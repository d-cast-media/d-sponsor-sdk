
/**
 * Preloads ad data from the contract.
 * @returns {Promise<void>} A promise that resolves when the data is preloaded.
 */
export default async function preload() {
    const offer = await this.admin.getOffer(this.offerId);
    this.offer = offer;

    const ads = await this.admin.getValidatedAdsFromOfferId(this.offerId);
    const bps = await this.admin.getBPS();
    this.ads = ads;
    this.bps = bps;
}
