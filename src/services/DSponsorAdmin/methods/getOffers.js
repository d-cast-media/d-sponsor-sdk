import {gql} from "@apollo/client/core/core.cjs";

export default async function getOffers() {
        const getOffersQuery = `
        {
              updateOffers(orderDirection:desc, orderBy:offerId){
                offerId,
                id,
                disable,
                name,
                rulesURI,
                nftContract,
                blockNumber,
                blockTimestamp,
                transactionHash,
                __typename
              }
        } 
    `;

        const offersRequest = await this.client.query({
            query: gql(getOffersQuery),
        });

        const offers = new Map();
        for (const offer of offersRequest.data.updateOffers) {
            offers.set(offer.offerId, offer);
        }

        return Object.values(Object.fromEntries(offers));

}
