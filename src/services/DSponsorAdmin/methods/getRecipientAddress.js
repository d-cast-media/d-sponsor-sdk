/**
 * Get the recipient address of the contract
 * @returns {Promise<string>} A promise that resolves with the recipient address.
 */
export default function getRecipientAddress(){
    return this.contract.recipient();
}
