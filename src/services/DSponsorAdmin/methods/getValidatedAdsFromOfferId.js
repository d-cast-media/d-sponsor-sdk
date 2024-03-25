import {gql} from "@apollo/client/core/core.cjs";
import isNumber from "../../../utils/isNumber.js";
import Ad from "../../../primitives/Ad/Ad.js";

/**
 * Get ads from offer ID
 * @param offerId
 * @returns {Promise}
 */
export default async function getValidatedAdsFromOfferId(offerId) {
    if (!isNumber(offerId)) {
        throw new Error(`Invalid offer ID: ${offerId}`);
    }
    const getValidatedProposalsQuery = `
        query GetValidatedProposals($offerId: ID!) {
            updateAdValidations(
                orderBy: blockNumber,
                orderDirection: desc,
                where: {
                    offerId: $offerId, 
                    validated:true
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

    const getValidatedProposalsRequest = await this.client.query({
        query: gql(getValidatedProposalsQuery),
        variables: {
            offerId,
        },
    });

    const {updateAdValidations} = getValidatedProposalsRequest.data;
    const adList = {};

    if (Array.isArray(updateAdValidations) && updateAdValidations.length > 0) {
        const validatedAdProposals = {};

        // This is an ordered list of validated adParameters and their corresponding proposalId
        // We need to take the first proposalId (last validated) for each adParameter.
        for (const updateAdValidation of updateAdValidations) {
            const {tokenId, proposalId, adParameter} = updateAdValidation;
            const key = `${offerId}-${updateAdValidation.tokenId}`;

            if (!validatedAdProposals[key]) {
                validatedAdProposals[key] = {offerId, tokenId, records: {}};
            }

            if (!validatedAdProposals[key].records[adParameter]) {
                validatedAdProposals[key].records[adParameter] = proposalId;
            }
        }

        // Now we have the last validated proposalId for each adParameter
        // We can get the data from the proposals
        for (const validatedAdProposal in validatedAdProposals) {
            const {offerId, tokenId, records} = validatedAdProposals[validatedAdProposal];
            // For each records, fetch the proposal
            for (const adParameter in records) {
                const proposalId = records[adParameter];
                const proposal = await this.getAdProposalFromProposalId(proposalId);

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
