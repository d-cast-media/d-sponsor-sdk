import {gql} from "@apollo/client/core/core.cjs";
import isNumber from "../../../utils/isNumber.js";
import Ad from "../../../primitives/Ad/Ad.js";

/**
 * Get ads proposals from offer ID
 * @param query The query to search for
 * @param query.offerId The offer ID to search for
 * @returns {Promise<null|Ad[]>} A promise that resolves with the ad proposals.
 */
export default async function getAdsProposals({offerId}) {
    if(!isNumber(offerId)) {
        throw new Error(`Invalid offer ID: ${offerId}`);
    }

    const adsRequestQuery = `
        query GetAdProposals($offerId: ID!) {
            updateAdProposals(first: 500, where: {offerId: $offerId}) {
                offerId
                proposalId
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

    const adProposalsList = {};


    if (adsRequest.data.updateAdProposals) {
        for (const ad of adsRequest.data.updateAdProposals) {
            const adProposal = {
                offerId: null,
                tokenId: null,
                records: {}
            }

            const {tokenId, offerId,proposalId} = ad;

            adProposal.offerId = offerId;
            adProposal.tokenId = tokenId;

            if (ad.adParameter) {
                adProposal.records[ad.adParameter] = {value:ad.data, proposalId};
            }
            adProposalsList[`${offerId}-${tokenId}`] = adProposal;
        }
        return Object.values(adProposalsList);
    }


    return null;
}
