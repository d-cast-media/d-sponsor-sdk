import getChainConfig from "./getChainConfig.js";
import {ethers} from "ethers";

class ChainNetwork {
    constructor({ rpc, chainName, contracts, chainId, assets } = {
        chainName: 'polygon-mumbai'
    }) {
        let defaultConfig = {};
        try {
            defaultConfig = getChainConfig(chainName)
        } catch (e) {
            // Catch error as we expect ChainNetwork init from unknown chain possible.
            console.error(e)
        }

        this.rpc = rpc ?? defaultConfig.rpc;
        this.provider = new ethers.JsonRpcProvider(this.rpc);
        this.contracts = Object.assign( defaultConfig.contracts, contracts)
        this.assets = Object.assign( defaultConfig.assets, assets)
        this.chainName = chainName
        this.chainId = chainId ?? defaultConfig.chainId
    }

    getCurrencyAddress(currencySymbol) {
        return this.assets[currencySymbol];
    }

    getCurrencyDecimals(currencySymbol) {
        if (currencySymbol === 'USDC') {
            return 6;
        }

        return 18;
    }
}

export default ChainNetwork;
