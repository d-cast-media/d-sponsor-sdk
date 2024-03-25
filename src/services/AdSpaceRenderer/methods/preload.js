/**
 * Preload function for the offer page.
 * It gets the offer and the ads from the offer id.
 * @returns {Promise<void>}
 */
export default async function preload() {
    const offer = await this.admin.getOffer({offerId:this.offerId});
    this.offer = offer;

    const ads = await this.admin.getValidatedAds({offerId:this.offerId});
    const bps = await this.admin.getBPS();
    this.ads = ads;
    this.bps = bps;
}
