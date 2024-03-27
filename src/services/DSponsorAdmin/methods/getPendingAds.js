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
        // Extract proposalIds from the current ad's records
        const proposalIds = Object.values(ad.records).map(record => record.proposalId);

        // Check if none of the proposalIds are in the validatedAds or rejectedAds
        const isInValidated = proposalIds.some(proposalId =>
            validatedAds.some(validatedAd =>
                Object.values(validatedAd.records).some(record => record.proposalId === proposalId)
            )
        );

        const isInRejected = proposalIds.some(proposalId =>
            rejectedAds.some(rejectedAd =>
                Object.values(rejectedAd.records).some(record => record.proposalId === proposalId)
            )
        );

        // If the ad's proposalId is not found in either validated or rejected, it's pending
        return !isInValidated && !isInRejected;
    });

    return pendingAds;
}
