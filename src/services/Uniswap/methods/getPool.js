import UniswapPool from "../../../primitives/UniswapPool/UniswapPool.js"
function getPool(fromToken,toToken){
    console.log(`Fetching pool for ${fromToken.symbol}/${toToken.symbol}`);
    return new UniswapPool({
        from: fromToken,
        toToken: toToken
    });
}

export default getPool;
