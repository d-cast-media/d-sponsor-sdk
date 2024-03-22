import {ethers} from "ethers";

/**
 * Preloads ad data from the contract.
 */
export default async function preload() {
    const supply = await this.contract.getTotalSupply();
    this.supply = supply;
    const maxSupply = await this.contract.getMaxSupply();
    this.maxSupply = maxSupply;
    const ads = await this.contract.getAds();
    this.ads = ads;
    const offerId = await this.contract.getOfferId();
    this.offerId = offerId;

    const DSponsorAdmin = await this.contract.getDSponsorAdmin();
    const bps = await DSponsorAdmin.getBPS();
    this.bps = bps;
    console.log(`Offer ID: ${offerId} - BPS: ${bps} - Supply: ${supply} / ${maxSupply}`);

    const info = await this.contract.getCreationInfo();
    this.id = info.id;
    this.currencies = info.currencies;
    this.prices = info.prices;
    this.allowedTokenIds = info.allowedTokenIds;
}
