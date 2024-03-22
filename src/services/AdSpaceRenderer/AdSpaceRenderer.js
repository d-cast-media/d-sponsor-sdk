import DSponsorNFT from "../DSponsorNFT/DSponsorNFT.js";
import render from "./methods/render.js";
import preload from "./methods/preload.js";
import select from "./methods/select.js";

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
        this.contract = new DSponsorNFT({
            address: props?.contract,
        });

        this.supply = 0;
        this.maxSupply = 0;

        this.selector = props.selector;
        this.selection = props.selection;
        this.ads = {};

        this.offerId = null;
    }

    /**
     * Creates an AdSpaceRenderer instance from a contract address.
     * @param {string} contract The contract address.
     * @param {Object} props Additional properties to set on the renderer.
     * @returns {AdSpaceRenderer} A new instance of AdSpaceRenderer.
     */
    static fromContract(contract, props = {}) {
        const { selector = 'dsponsor', selection = 'grid 2x4' } = props;

        return new AdSpaceRenderer({
            contract,
            selector,
            selection
        });
    }
}

AdSpaceRenderer.prototype.preload = preload;
AdSpaceRenderer.prototype.render = render;
AdSpaceRenderer.prototype.select = select;
export default AdSpaceRenderer;
