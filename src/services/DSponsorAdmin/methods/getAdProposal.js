import {gql} from "@apollo/client/core/core.cjs";
import isNumber from "../../../utils/isNumber.js";
import Ad from "../../../primitives/Ad/Ad.js";


async function fetchByOfferId(offerId) {
    const query = `
        query GetAdProposalByOfferId($offerId: ID!) {
            updateAdProposals(where: {
                offerId: $offerId
            }) {
                offerId
                proposalId
                tokenId
                adParameter
                data
            }
        }
        `;

    const response = await this.client.query({
        query: gql(query),
        variables: {
            offerId
        }
    });

    const {updateAdProposals} = response.data;

    return updateAdProposals;
}

async function fetchByProposalId(proposalId) {
    const query = `
        query GetAdProposalByProposalId($proposalId: ID!) {
            updateAdProposals(where: {
                proposalId: $proposalId
            }) {
                offerId
                tokenId
                proposalId
                adParameter
                data
            }
        }
        `;

    const response = await this.client.query({
        query: gql(query),
        variables: {
            proposalId
        }
    });

    const {updateAdProposals} = response.data;

    return updateAdProposals;
}

/**
 * Get ad proposal from query
 * @param query The query to search for
 * @param {number} [query.proposalId] The proposal ID to search for.
 * @param {number} [query.offerId] The offer ID to search for.
 * @returns {Promise<null|{offerId: null, tokenId: null, records: {}}>} A promise that resolves with the ad proposal.
 */
export default async function getAdProposal({proposalId, offerId}) {
    let updateAdProposals = null;
    if (proposalId !== null) {
        if (!isNumber(proposalId)) {
            throw new Error(`Invalid proposal ID: ${proposalId}`);
        }
        updateAdProposals = await fetchByProposalId.call(this, proposalId);
    } else if (offerId !== null) {
        if (!isNumber(offerId)) {
            throw new Error(`Invalid offer ID: ${offerId}`);
        }
        updateAdProposals = await fetchByOfferId.call(this, offerId);
    }

    const adProposal = {
        offerId: null,
        tokenId: null,
        records: {}
    }

    if (!updateAdProposals) {
        return null;
    }

    if (Array.isArray(updateAdProposals) && updateAdProposals.length > 0) {
        const {tokenId, offerId, proposalId} = updateAdProposals[0];

        adProposal.offerId = offerId;
        adProposal.tokenId = tokenId;

        for (const ad of updateAdProposals) {
            if (ad.adParameter) {
                adProposal.records[ad.adParameter] = {value: ad.data, proposalId};
            }
        }

        return adProposal;
    }

    return null;
}
