import DSponsorAdmin from "../../DSponsorAdmin/DSponsorAdmin.js";

export default function getDSponsorAdmin(options = {}) {
    return new DSponsorAdmin({
        address: this.chain.contracts.DSponsorAdmin,
        signer: options?.signer ?? this.signer,
    });
}
