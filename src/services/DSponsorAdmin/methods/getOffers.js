import {gql} from "@apollo/client/core/core.cjs";

/**
 * Get offers
 * @returns {Promise<any[]>} A promise that resolves with the offers: an array of objects.
 * @example
 * const offers = await getOffers();
 * console.log(offers);
 * //Output: [{ offerId: '1', id: '1', disable: false, name: 'Offer 1', rulesURI: 'https://example.com', nftContract: '0x123', blockNumber: 123, blockTimestamp: 123, transactionHash: '0x123' }]
 */
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
