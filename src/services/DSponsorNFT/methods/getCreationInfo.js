import {gql} from "@apollo/client/core/core.cjs";

export default async function getCreationInfo() {
    const contractAddress = this.address;
    const getCreationInfoQuery = `
                query GetTransactionReceipt($contractAddress: String!) {
                    newDSponsorNFTs(where: {contractAddr: $contractAddress}) {
                        id
                        transactionHash,
                        currencies,
                        prices,
                        allowedTokenIds
                    }
            }
            `;

    const creationInfoRequest = await this.client.query({
        query: gql(getCreationInfoQuery),
        variables: {
            contractAddress,
        },
    });

    const [creationInfo] = creationInfoRequest.data.newDSponsorNFTs;
    return creationInfo;
}
