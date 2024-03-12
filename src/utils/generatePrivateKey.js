import {ethers} from "ethers";

function generatePrivateKey() {
    return ethers.Wallet.createRandom().privateKey;
}

export default generatePrivateKey;
