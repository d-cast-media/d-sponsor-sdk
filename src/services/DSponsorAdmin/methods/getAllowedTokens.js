import {gql} from "@apollo/client/core/core.cjs";
import isNumber from "../../../utils/isNumber.js";

/**
 * Get all allowed tokens from an ID
 * @param query The query to search for
 * @param query.id The ID to search for (queryable id)
 * @returns {Promise<{id: *, tokenId: *, allowed: *, transactionHash: *}[]>} A promise that resolves with the allowed tokens.
 */
export default async function getAllowedTokens({id}) {
    if(!isNumber(id)) {
        throw new Error(`Invalid ID: ${id}`);
    }
    const getAllowedTokensQuery = `
       {
          tokensAllowlistUpdateds(where:{
            id_contains: "${id}"
          }){
            id,
            tokenId,
            allowed,
            blockNumber,
            blockTimestamp,
            transactionHash,
            __typename
          }
      }`;


    const allowedTokensRequest = await this.client.query({
        query: gql(getAllowedTokensQuery),
    });

    const allowedTokens = allowedTokensRequest.data.tokensAllowlistUpdateds.map(token => {
        return {
            id: token.id,
            tokenId: token.tokenId,
            allowed: token.allowed,
            transactionHash: token.transactionHash,
        }
    });

    return allowedTokens;
}
