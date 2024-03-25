import getChainConfig from "./getChainConfig.js";
import {ethers} from "ethers";

class ChainNetwork {
    constructor({rpc, chainName, graphApiUrl, contracts, chainId, assets} = {
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
        this.graphApiUrl = graphApiUrl ?? defaultConfig.graphApiUrl;
        this.provider = new ethers.JsonRpcProvider(this.rpc);
        this.contracts = Object.assign(defaultConfig.contracts, contracts)
        this.assets = Object.assign(defaultConfig.assets, assets)
        this.chainName = chainName
        this.chainId = chainId ?? defaultConfig.chainId
    }

    getCurrencyAddress(currencySymbol) {
        return this.assets[currencySymbol];
    }

    getCurrencyDecimals(currencySymbol) {
        // We could use ethers to get the decimals for the currencySymbol
        // However, we are using a hardcoded value for now to avoid the need to make a call to the blockchain
        // to get the decimals for the currencySymbol every time we need it.

        if (this.assets[currencySymbol] === undefined) {
            throw new Error(`Currency ${currencySymbol} not found in assets`);
        }
        return this.assets[currencySymbol].decimals;

    }
}

export default ChainNetwork;
