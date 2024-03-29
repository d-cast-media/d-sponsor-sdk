import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core/core.cjs";
import Ad from "../../../primitives/Ad/Ad.js";

export default async function getAds() {
    if(!this.offerId) {
        this.offerId = await this.getOfferId();
    }

    const offerId = this.offerId;

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

    const adsRequest = await this.client.query({
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
            adList[key].addRecord({ kind: 'linkURL', value: ad.data });
        } else if (ad.adParameter === 'imageURL') {
            adList[key].addRecord({ kind: 'imageURL', value: ad.data });
        }
    }

    // Convert adList values to an array for easy iteration
    return Object.values(adList);
}
