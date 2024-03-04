class Token {

    constructor({chainName, tokenName} = {chainName: 'Unknown', tokenName: 'Unknown'}) {
        this.chainName = chainName;
        this.name = tokenName;
    }

    toString() {
        return `<Token[${this.chainName}]: ${this.name}>`;
    }
}

export default Token;
