/**
 * Get the address of the swap router
 * @returns {Promise<string>} A promise that resolves with the swap router address.
 */
export default function getSwapRouterAddress(){
    return this.contract.swapRouter();
}
