import DSponsorNFT from "../../DSponsorNFT/DSponsorNFT.js";
export default function getDSponsorNFT(address) {
    return new DSponsorNFT({
        address,
        signer: this.signer,
        chain: this.chain
    });
}
