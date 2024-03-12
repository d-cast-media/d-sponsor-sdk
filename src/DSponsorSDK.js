import {ethers} from "ethers";
import ChainNetwork from "./primitives/ChainNetwork/ChainNetwork.js";
import DSponsorAdmin from "./services/DSponsorAdmin/DSponsorAdmin.js";
import generatePrivateKey from "./utils/generatePrivateKey.js";

class DSponsorSDK {
    constructor({chain, privateKey} = {}) {
        this.chain = new ChainNetwork(chain);

        let key = privateKey || generatePrivateKey();
        const signer = new ethers.Wallet(key, this.chain.provider);
        this.signer = signer;

        this.contracts = {
            "DSponsorAdmin": new DSponsorAdmin({
                address: this.chain.contracts.DSponsorAdmin,
                signer
            })
        }
    }
    renderAdSpace(props){
        return new AdSpaceRenderer(props);
    }
    getSigner() {
        return this.signer;
    }

    static generatePrivateKey() {
        return generatePrivateKey();
    }

    async approve({currency, amount}) {
        const contract = new ethers.Contract(currency, ['function approve(address spender, uint256 amount) returns (bool)'], this.signer);
        console.log(`Approving ${amount} to ${this.contracts.DSponsorAdmin.address}...`);
        const tx = await contract.approve(this.contracts.DSponsorAdmin.address, amount);
        const receipt = await tx.wait();
        return receipt;
    }
}

export default DSponsorSDK;
