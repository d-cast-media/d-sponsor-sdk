import {ethers} from "ethers";
import ChainNetwork from "./primitives/ChainNetwork/ChainNetwork.js";
import DSponsorAdmin from "./services/DSponsorAdmin/DSponsorAdmin.js";


function generatePrivateKey() {
    return ethers.Wallet.createRandom().privateKey;
}
class DSponsorSDK {
    constructor({chain, privateKey} = {}) {
        this.chain = new ChainNetwork(chain);

        let key = privateKey || generatePrivateKey();
        const signer = new ethers.Wallet(key, this.chain.provider);

        this.contracts = {
            "DSponsorAdmin": new DSponsorAdmin({
                address: this.chain.contracts.DSponsorAdmin,
                signer
            })
        }
    }

    static generatePrivateKey() {
        return generatePrivateKey();
    }
}

export default DSponsorSDK;
