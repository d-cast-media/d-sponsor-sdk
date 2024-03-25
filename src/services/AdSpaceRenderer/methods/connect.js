import {ethers} from "ethers";
import DSponsorNFT from "../../DSponsorNFT/DSponsorNFT.js";
import {DSponsorAdmin} from "../../../index.js";

/**
 * Called before preload, allows to get signer from provider and associate for transaction support
 * @returns {Promise<void>}
 */
export default async function connect() {
    const ethereum = (typeof window !== 'undefined') ? window.ethereum : null;
    if (!ethereum) {
        throw new Error('Ethereum provider not found.');
    }
    const provider = new ethers.BrowserProvider(ethereum);
    await provider.send("eth_accounts", []);
    const signer = await provider.getSigner();
    this.signer = signer;

    this.admin = new DSponsorAdmin({
        address: this.admin.address,
        signer,
        chain: this.admin.chain,
    });

}
