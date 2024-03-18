import DSponsorNFT from "../DSponsorNFT/DSponsorNFT.js";
import render from "./methods/render.js";

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
        this.selector = props.selector;
        this.selection = props.selection;
        this.ads = {};
    }

    /**
     * Preloads ad data from the contract.
     */
    async preload() {
        const supply = await this.contract.getTotalSupply();
        const maxSupply = await this.contract.getMaxSupply();
        console.log(`Supply: ${supply} / ${maxSupply}`);

        const ads = await this.contract.getAds();
        this.ads = ads;
    }

    /**
     * Selects ads based on the provided selection criteria.
     * @param {string} selection The selection criteria, e.g., 'random 1', 'grid 2x2'.
     * @returns {Array} An array of selected ads.
     */
    select(selection) {
        const [type, count] = selection.split(' ');
        const adList = Object.values(this.ads);
        let selectedAds = [];

        switch (type) {
            case 'random':
                selectedAds = adList.sort(() => Math.random() - 0.5).slice(0, parseInt(count));
                break;
            case 'grid':
                selectedAds = adList.slice(0, parseInt(count));
                break;
        }

        return selectedAds;
    }

    /**
     * Creates an AdSpaceRenderer instance from a contract address.
     * @param {string} contract The contract address.
     * @param {Object} props Additional properties to set on the renderer.
     * @returns {AdSpaceRenderer} A new instance of AdSpaceRenderer.
     */
    static fromContract(contract, props = {}) {
        const { selector = 'dsponsor', selection = 'grid 10' } = props;

        return new AdSpaceRenderer({
            contract,
            selector,
            selection
        });
    }
}

AdSpaceRenderer.prototype.render = render;
export default AdSpaceRenderer;
