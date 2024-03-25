import isNumber from "../../../utils/isNumber.js";
import {gql} from "@apollo/client/core/core.cjs";

export default async function getOffer(offerId) {
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

    const getAllowedTokensQuery = `
       {
          tokensAllowlistUpdateds(where:{
            id_contains: "${offer.queryableId}"
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

    const updateDefaultMintPricesQuery = `
         {
             updateDefaultMintPrices(where:{
                id_contains: "${offer.queryableId}"
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
