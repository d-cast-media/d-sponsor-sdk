import {gql} from "@apollo/client/core/core.cjs";
import {ethers} from "ethers";

async function getTransfersForAddress(address){
    const getTransfersQuery = `
        {
          transfers(
               orderBy: blockTimestamp,
               orderDirection: desc,
               where:{
                    to: "${address}"
               }){
                id,
                from,
                to,
                tokenId,
                blockNumber,
                blockTimestamp,
                transactionHash,
                __typename
              }
        } 
    `;


    const offersIdsRequest = await this.client.query({
        query: gql(getTransfersQuery),
    });

    return offersIdsRequest.data.transfers;
}


/**
 * Get all ads owned by the given address
 * @param query
 * @param query.address {string} - Address of the owner
 * @returns {Promise<*[]>} - Array of ads
 * @example
 * const ownedTokens = await sdk.getOwnedOfferTokens({address: '0x1234...'});
 * console.log(ownedTokens);
 * [
 *   {
 *     tokenId: '1',
 *     ownerAddress: '0xC4753FdeD1998bE4dE94F141767D2c77A268a881',
 *     nftContractAddress: '0x2142fcd6f3b4920e2c164fb8339da276f8108eaa',
 *     offer: {
 *       __typename: 'UpdateOffer',
 *       offerId: '23',
 *       id: '0x1e9cfb3a3d87d07d14a78681061c52d88225f7fd101d81ff7f76ba6353eff2af2c000000',
 *       disable: false,
 *       name: 'Nice Ad',
 *       rulesURI: 'https://6f375d41f2a33f1f08f6042a65d49ec9.ipfscdn.io/ipfs/bafybeiapxrixt5fdnulaljkivpwbrxeimzp7jdzlnxcnwd62ja5nftwwgy/',
 *       nftContract: '0x2142fcd6f3b4920e2c164fb8339da276f8108eaa',
 *       blockNumber: '47442241',
 *       blockTimestamp: '1711319887',
 *       transactionHash: '0x1e9cfb3a3d87d07d14a78681061c52d88225f7fd101d81ff7f76ba6353eff2af'
 *     }
 *   }
 * ]
 */
export default async function getOwnedOfferTokens(query = {}) {
    const {address} = query;

    if(!address) {
        throw new Error('Address is required');
    }

    // Three steps
    // 1. Fetch all Offers
    const offers = await await this.getOffers();

    // 2. Fetch all NFT contracts for those offers (updateOffers event)
    const nftContractsAddresses = offers.map(offer => offer.nftContract);


    // 3. Fetch all Tokens via Transfer event for those NFT contracts
    const transfers = await getTransfersForAddress.call(this,address);

    const transfersTokenIds = transfers.map(transfer => {
        return transfer.tokenId;
        // return {
        //     tokenId: transfer.tokenId,
        //     id: transfer.id.slice(0,66)
        // }
    })
        // remove duplicates
        .filter((value, index, self) => self.indexOf(value) === index);


    let ownedAds = [];

    for(let nftContractAddress of nftContractsAddresses.slice(-1)) {
        const nftContract =  new ethers.Contract(nftContractAddress, [
            'event Transfer(address,address,uint256)',
            'function ownerOf(uint256 tokenId) view returns (address)',
            'function balanceOf(address owner) view returns (uint256)',
        ], this.chain.provider);

        const numberOfTokens = await nftContract.balanceOf(address);

        if(numberOfTokens === 0) {
            continue;
        }

        // Try all tokens
        for (let tokenId of transfersTokenIds) {
            try {
                const ownerAddress = await nftContract.ownerOf(tokenId);
                ownedAds.push({ tokenId, ownerAddress, nftContractAddress });
            } catch (error) {}
        }
    }

    ownedAds = ownedAds.map(ownedAd => {
        const offerOwned = offers.find(offer => offer.nftContract === ownedAd.nftContractAddress);
        ownedAd.offer = offerOwned;
        return ownedAd;
    })

    return ownedAds;
}
