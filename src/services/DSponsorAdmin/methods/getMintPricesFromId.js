import {gql} from "@apollo/client/core/core.cjs";

export default async function getMintPricesFromId(id){
    const updateDefaultMintPricesQuery = `
         {
             updateDefaultMintPrices(where:{
                id_contains: "${id}"
            }){
                id,
                amount,
                currency,
                enabled,
                amount,
                blockNumber,
                blockTimestamp,
                transactionHash,
                __typename
             }
        }`;


    const updateDefaultMintPricesRequest = await this.client.query({
        query: gql(updateDefaultMintPricesQuery),
    });


    const updateDefaultMintPrices = updateDefaultMintPricesRequest.data.updateDefaultMintPrices.map(price => {
        return {
            id: price.id,
            amount: price.amount,
            currency: price.currency,
            enabled: price.enabled,
            blockNumber: price.blockNumber,
            blockTimestamp: price.blockTimestamp,
            transactionHash: price.transactionHash,
        }
    });

    return updateDefaultMintPrices;
}
