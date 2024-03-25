import {gql} from "@apollo/client/core/core.cjs";
import isNumber from "../../../utils/isNumber.js";
import Ad from "../../../primitives/Ad/Ad.js";

/**
 * Get ads proposals from offer ID
 * @param offerId
 * @returns {Promise}
 */
export default async function getAdsProposalsFromOfferId(offerId) {
    if(!isNumber(offerId)) {
        throw new Error(`Invalid offer ID: ${offerId}`);
    }

    const adsRequestQuery = `
        query GetAdProposals($offerId: ID!) {
            updateAdProposals(first: 500, where: {offerId: $offerId}) {
                offerId
                tokenId
                adParameter
                data
            }
        }
    `;

    const adsRequest = await this.client.query({
        query: gql(adsRequestQuery),
        variables: {
            offerId,
        },
    });

    const adData = adsRequest.data.updateAdProposals;

    const adList = {};

    for (const ad of adData) {
        const key = `${ad.offerId}-${ad.tokenId}`;
        if (!adList[key]) {
            adList[key] = new Ad({ offerId: ad.offerId, tokenId: ad.tokenId });
        }
        if(ad.adParameter){
            adList[key].addRecord({ kind: ad.adParameter, value: ad.data });
        }
    }

    // Convert adList values to an array for easy iteration
    return Object.values(adList);
}
