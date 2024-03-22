import {ethers} from "ethers";
import DSponsorNFT from "../../DSponsorNFT/DSponsorNFT.js";

/**
 * Called before preload, allows to get signer from provider and associate for transaction support
 * @returns {Promise<void>}
 */
export default async function connect() {
    const provider = new ethers.BrowserProvider(window?.ethereum);
    await provider.send("eth_accounts", []);
    const signer = await provider.getSigner();
    this.signer = signer;

    this.contract = new DSponsorNFT({
        address: this.contract.address,
        signer,
        chain: this.contract.chain,
    });
}
