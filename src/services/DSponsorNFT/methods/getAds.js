import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Ad from "../../../primitives/Ad/Ad.js";
const APIURL = 'https://api.studio.thegraph.com/proxy/65744/dsponsor-mumbai/0.0.4/'

export default async function getAds() {
    const getOfferIdQuery = `
        query GetOfferId($contractAddress: String!) {
            updateOffers(where: {nftContract: $contractAddress}) {
                id
                offerId
            }
        }
    `;

    const client = new ApolloClient({
        uri: APIURL,
        cache: new InMemoryCache(),
    });

    const offersRequest = await client.query({
        query: gql(getOfferIdQuery),
        variables: {
            contractAddress: this.address,
        },
    });

    const offers = offersRequest.data.updateOffers;
    const offerId = offers[0].offerId;

    const adsRequestQuery = `
        query GetAdProposals($offerId: ID!) {
            updateAdProposals(first: 500, where: {offerId: $offerId}) {
                offerId
                tokenId
                adParameter
                data
            }
        }
    `;

    const adsRequest = await client.query({
        query: gql(adsRequestQuery),
        variables: {
            offerId,
        },
    });

    const adData = adsRequest.data.updateAdProposals;

    const adList = {};

    for (const ad of adData) {
        const key = `${ad.offerId}-${ad.tokenId}`;
        if (!adList[key]) {
            adList[key] = new Ad({ offerId: ad.offerId, tokenId: ad.tokenId });
        }

        if (ad.adParameter === 'linkURL') {
            adList[key].addRecord({ kind: 'link', value: ad.data });
        } else if (ad.adParameter === 'imageURL') {
            const response = await fetch(ad.data);
            const json = await response.json();
            adList[key].addRecord({ kind: 'image', value: json.image[0] });
        }
    }

    // Convert adList values to an array for easy iteration
    return Object.values(adList);
}
