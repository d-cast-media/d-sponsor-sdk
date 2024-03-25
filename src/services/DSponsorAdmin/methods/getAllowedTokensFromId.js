import {gql} from "@apollo/client/core/core.cjs";

export default async function getAllowedTokensFromId(id){
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
