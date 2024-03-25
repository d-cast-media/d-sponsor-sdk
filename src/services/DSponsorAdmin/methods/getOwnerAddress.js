/**
 * Get the owner address of the contract
 * @returns {Promise<string>} A promise that resolves with the owner address.
 */
export default function getOwnerAddress(){
    return this.contract.owner();
}
