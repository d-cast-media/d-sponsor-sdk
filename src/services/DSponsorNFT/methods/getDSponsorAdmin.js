import DSponsorAdmin from "../../DSponsorAdmin/DSponsorAdmin.js";

export default function getDSponsorAdmin() {
    return new DSponsorAdmin({
        address: this.chain.contracts.DSponsorAdmin,
        signer: this.signer,
    });
}
