import {gql} from "@apollo/client/core/core.cjs";
import isNumber from "../../../utils/isNumber.js";
import Ad from "../../../primitives/Ad/Ad.js";

/**
 * Get ad proposals from offer ID
 * @param query The query to search for
 * @param query.offerId The offer ID to search for
 * @returns {Promise<null|Ad[]>} A promise that resolves with the ad proposals.
 */
export default async function getAdProposals({offerId}) {
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
            const {tokenId, offerId, proposalId, adParameter, data} = ad;
            const key = `${offerId}-${tokenId}`;

            // Initialize adProposal object if it doesn't exist
            if (!adProposalsList[key]) {
                adProposalsList[key] = {
                    offerId: offerId,
                    tokenId: tokenId,
                    records: {}
                };
            }

            // Add or update the adParameter in records
            adProposalsList[key].records[adParameter] = { value: data, proposalId };
        }

        return Object.values(adProposalsList);
    }

    return null;
}
