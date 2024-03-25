import {gql} from "@apollo/client/core/core.cjs";
import isNumber from "../../../utils/isNumber.js";
import Ad from "../../../primitives/Ad/Ad.js";

/**
 * Get ad proposal from proposal ID
 * @param offerId
 * @returns {Promise}
 */
export default async function getAdProposalFromProposalId(proposalId) {
    if(!isNumber(proposalId)) {
        throw new Error(`Invalid proposal ID: ${proposalId}`);
    }

    const getProposalQuery = `
        query GetProposal($proposalId: ID!) {
            updateAdProposals(where: {
                proposalId: $proposalId
            }) {
                offerId
                tokenId
                adParameter
                data
            }
        }
    `;

    const getProposalRequest = await this.client.query({
        query: gql(getProposalQuery),
        variables: {
            proposalId,
        },
    });

    const adProposal = {
        offerId: null,
        tokenId: null,
        records:{}
    }

    const {updateAdProposals} = getProposalRequest.data;

    if(Array.isArray(updateAdProposals) && updateAdProposals.length > 0) {
        const {tokenId, offerId} = updateAdProposals[0];

        adProposal.offerId = offerId;
        adProposal.tokenId = tokenId;

        for(const ad of updateAdProposals) {
            if(ad.adParameter){
                adProposal.records[ad.adParameter] = ad.data;
            }
        }

        return adProposal;
    }

    return null;
}
