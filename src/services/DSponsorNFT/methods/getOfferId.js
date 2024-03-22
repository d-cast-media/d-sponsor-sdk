import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core/core.cjs";

export default async function getOfferId() {
    const getOfferIdQuery = `
        query GetOfferId($contractAddress: String!) {
            updateOffers(where: {nftContract: $contractAddress}) {
                id
                offerId
            }
        }
    `;

    const offersRequest = await this.client.query({
        query: gql(getOfferIdQuery),
        variables: {
            contractAddress: this.address,
        },
    });


    const offers = offersRequest.data.updateOffers;
    if(offers.length === 0) return [];
    const offerId = offers[0].offerId;

    return offerId;
}
