import {gql} from "@apollo/client/core/core.cjs";


async function getAllOffers() {
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


async function getOffersByAdmin({address}) {
    const offersAdmin = await this.getOffersAdmin({address});

    // We have an array of admin (address) and offerId,
    // We can use it to get the offers using updateOffers where clause

    const offerIds = offersAdmin.map(offer => offer.offerId);
    const getOffersQuery = `
        {
              updateOffers(where:{offerId_in:[${offerIds}]}, orderDirection:desc, orderBy:offerId){
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


/**
 * Get all offers or offers by admin.
 * @param {Object} props - The props of the offers.
 * @param {string} [props.address] - The address of the admin. When not provided, all offers are returned.
 * @returns {Promise<any[]>} A promise that resolves with the offers: an array of objects.
 * @example
 * const offers = await getOffers();
 * console.log(offers);
 * //Output: [{ offerId: '1', id: '1', disable: false, name: 'Offer 1', rulesURI: 'https://example.com', nftContract: '0x123', blockNumber: 123, blockTimestamp: 123, transactionHash: '0x123' }]
 */
export default async function getOffers(props = {address: null}){
    const {address} = props;
    if(address) {
        return await getOffersByAdmin.call(this,{address});
    }

    return await getAllOffers.call(this);
}
