import DSponsorNFT from "../DSponsorNFT/DSponsorNFT.js";
import render from "./methods/render.js";
import preload from "./methods/preload.js";
import select from "./methods/select.js";
import connect from "./methods/connect.js";
import {DSponsorAdmin} from "../../index.js";

/**
 * Handles rendering of ad spaces using NFT contracts for ad data.
 */
class AdSpaceRenderer {
    /**
     * Initializes a new instance of the AdSpaceRenderer.
     * @param {Object} props The initialization properties.
     * @param {string} props.contract The contract address.
     * @param {string} props.selector The DOM selector for the ad space.
     * @param {string} props.selection The selection criteria for ads.
     */
    constructor(props) {
        const { offerId } = props;

        const { address, signer, chain } = props;

        this.admin = new DSponsorAdmin({
            address,
            signer,
            chain,
        });

        this.offer = null;

        this.selector = props.selector;
        this.selection = props.selection;

        this.offerId = offerId.toString();

        this.ads = {};
        this.bps = null;
        this.id = null; // id is also the txhash of the minting transaction on the DSponsorNFT contract

        this.referral = props?.referral ?? 'dsponsor';
    }

    // /**
    //  * Creates an AdSpaceRenderer instance from a contract address.
    //  * @param {string} contract The contract address.
    //  * @param {Object} props Additional properties to set on the renderer.
    //  * @returns {AdSpaceRenderer} A new instance of AdSpaceRenderer.
    //  */
    // static fromContract(contract, props = {}) {
    //     const { selector = 'dsponsor', selection = 'grid 2x4', referral } = props;
    //
    //     return new AdSpaceRenderer({
    //         contract,
    //         selector,
    //         selection,
    //         referral,
    //     });
    // }

    /**
     * Creates an AdSpaceRenderer instance from an offer ID.
     * @param {number} offerId The offer ID.
     * @param {Object} props Additional properties to set on the renderer.
     * @returns {AdSpaceRenderer} A new instance of AdSpaceRenderer.
     */
    static fromOffer(offerId, props = {}) {
        const {selector = 'dsponsor', selection = 'grid 2x4', referral} = props;

        return new AdSpaceRenderer({
            offerId,
            selector,
            selection,
            referral,
        });
    }
}

AdSpaceRenderer.prototype.preload = preload;
AdSpaceRenderer.prototype.connect = connect;
AdSpaceRenderer.prototype.render = render;
AdSpaceRenderer.prototype.select = select;
export default AdSpaceRenderer;
