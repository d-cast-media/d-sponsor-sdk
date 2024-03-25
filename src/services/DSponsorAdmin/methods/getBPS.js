/**
 * Get the basis points of the contract
 * @method getBPS
 * @returns {*} The basis points of the contract
 */
export default function getBPS(){
    return this.contract.bps();
}
