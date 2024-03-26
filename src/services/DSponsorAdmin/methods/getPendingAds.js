import {gql} from "@apollo/client/core/core.cjs";
import isNumber from "../../../utils/isNumber.js";
import Ad from "../../../primitives/Ad/Ad.js";

/**
 * Get pending ads from offer ID
 *
 * @param query The query to search for
 * @param query.offerId The offer ID to search for
 * @returns {Promise<Ad[]>} A promise that resolves with the pending ads.
 *
 */
export default async function getPendingAds({offerId}) {
    if (!isNumber(offerId)) {
        throw new Error(`Invalid offer ID: ${offerId}`);
    }
    const adsProposals = await this.getAdsProposals({offerId});
    const validatedAds = await this.getValidatedAds({offerId});
    const rejectedAds = await this.getRejectedAds({offerId});

    const pendingAds = adsProposals.filter(ad => {
        return !validatedAds.find(validatedAd => validatedAd.id === ad.id)
            && !rejectedAds.find(rejectedAd => rejectedAd.id === ad.id);
    });

    return pendingAds;
}
