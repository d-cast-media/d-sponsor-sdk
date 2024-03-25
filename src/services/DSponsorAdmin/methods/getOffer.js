import isNumber from "../../../utils/isNumber.js";
import {gql} from "@apollo/client/core/core.cjs";

/**
 * Get offer from offer ID
 * @param query The query to search for
 * @param query.offerId The offer ID to search for
 * @returns {Promise<{queryableId, disable, nftContract, allowedTokens: *, name, offerId, rulesURI, id, maxSupply: (*|number), prices: *, currencies: *}>} A promise that resolves with the offer.
 */
export default async function getOffer({offerId}) {
    if(!isNumber(offerId)) {
        throw new Error('Offer ID must be a number');
    }

    const getOfferQueryByOfferId = `
       {
              updateOffers(where:{
                offerId: ${offerId}
          }) {
                offerId
                id
                disable
                name
                rulesURI
                nftContract
                blockNumber
                blockTimestamp
                transactionHash
                __typename
          }
      }`;

    const offerRequest = await this.client.query({
        query: gql(getOfferQueryByOfferId),
    });

    const offerData = offerRequest?.data?.updateOffers[0] || {};

    if(!offerData.offerId) {
        throw new Error(`Offer ${offerId} not found`);
    }
    const offer = {
        offerId: offerData.offerId,
        id: offerData.id,
        disable: offerData.disable,
        name: offerData.name,
        rulesURI: offerData.rulesURI,
        nftContract: offerData.nftContract,
        blockNumber: offerData.blockNumber,
        blockTimestamp: offerData.blockTimestamp,
        transactionHash: offerData.transactionHash,
        queryableId: offerData.id.slice(0,66),
    }

    const allowedTokens = await this.getAllowedTokens({id:offer.queryableId});
    const updateDefaultMintPrices = await this.getMintPrices({id:offer.queryableId});

    return {
        offerId: offer.offerId,
        id: offer.id,
        disable: offer.disable,
        name: offer.name,
        rulesURI: offer.rulesURI,
        nftContract: offer.nftContract,
        currencies: updateDefaultMintPrices.map(price => {
            return price.currency
        }),
        prices: updateDefaultMintPrices.map(price => {
            return price.amount
        }),
        allowedTokens: allowedTokens.map(token => {
            return token.tokenId
        }),
        queryableId: offer.queryableId,
        maxSupply: allowedTokens?.length || -1,
    }
}
