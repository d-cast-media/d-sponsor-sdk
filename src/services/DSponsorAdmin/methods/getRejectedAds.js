import {gql} from "@apollo/client/core/core.cjs";
import isNumber from "../../../utils/isNumber.js";
import Ad from "../../../primitives/Ad/Ad.js";

/**
 * Get rejected ads from offer ID
 *
 * @param query The query to search for
 * @param query.offerId The offer ID to search for
 * @returns {Promise<Ad[]>} A promise that resolves with the rejected ads.
 *
 */
export default async function getRejectedAds({offerId}) {
    if (!isNumber(offerId)) {
        throw new Error(`Invalid offer ID: ${offerId}`);
    }
    const getRejectedProposalsQuery = `
        query GetRejectedProposals($offerId: ID!) {
            updateAdValidations(
                orderBy: blockNumber,
                orderDirection: desc,
                where: {
                    offerId: $offerId, 
                    validated:false
                }) {
                    tokenId,
                    blockNumber,
                    adParameter,
                    reason,
                    proposalId,
                    validated
                }
        }
    `;

    const getRejectedProposalsRequest = await this.client.query({
        query: gql(getRejectedProposalsQuery),
        variables: {
            offerId,
        },
    });

    const {updateAdValidations} = getRejectedProposalsRequest.data;
    const adList = {};

    if (Array.isArray(updateAdValidations) && updateAdValidations.length > 0) {
        const rejectedAdProposals = {};

        // This is an ordered list of rejected adParameters and their corresponding proposalId
        // We need to take the first proposalId (last rejected) for each adParameter.
        for (const updateAdValidation of updateAdValidations) {
            const {tokenId, proposalId, adParameter} = updateAdValidation;
            const key = `${offerId}-${updateAdValidation.tokenId}`;

            if (!rejectedAdProposals[key]) {
                rejectedAdProposals[key] = {offerId, tokenId, records: {}};
            }

            if (!rejectedAdProposals[key].records[adParameter]) {
                rejectedAdProposals[key].records[adParameter] = proposalId;
            }
        }

        // Now we have the last rejected proposalId for each adParameter
        // We can get the data from the proposals
        for (const rejectedAdProposal in rejectedAdProposals) {
            const {offerId, tokenId, records} = rejectedAdProposals[rejectedAdProposal];
            // For each records, fetch the proposal
            for (const adParameter in records) {
                const proposalId = records[adParameter];
                const proposal = await this.getAdProposal({proposalId});

                const key = `${offerId}-${tokenId}`;
                if (!adList[key]) {
                    adList[key] = new Ad({offerId: proposal.offerId, tokenId: proposal.tokenId});
                }
                if (proposal?.records?.[adParameter]) {
                    adList[key].addRecord({kind: adParameter, value: proposal.records[adParameter]});
                }
            }
        }
    }

    return Object.values(adList);
}
