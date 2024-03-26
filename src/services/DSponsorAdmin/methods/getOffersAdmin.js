import {gql} from "@apollo/client/core/core.cjs";


async function getOffersByAdmin({address}) {
    const getOffersQuery = `
        {
          updateOfferAdmins(
               orderBy: blockTimestamp,
               orderDirection: desc,
               where:{
                    admin: "${address}"
               }){
                id,
                offerId,
                admin,
                enable,
                blockNumber,
                blockTimestamp,
                transactionHash,
                __typename
              }
        } 
    `;

    const offersIdsRequest = await this.client.query({
        query: gql(getOffersQuery),
    });

    const offers = new Map();
    for (const offer of offersIdsRequest.data.updateOfferAdmins) {
        offers.set(offer.offerId, offer);
    }

    return Object.values(Object.fromEntries(offers));

}


/** Get offers by admin
 * @param {object} props - Props
 * @param {object} props.address - Address of the admin
 * @returns {Promise<*>}
 */
export default async function getOffersAdmin(props = {address: null}) {
    const {address} = props;
    if (!address) {
        throw new Error("Address is required");
    }
    return await getOffersByAdmin.call(this, {address});
}
