import DSponsorNFT from "../DSponsorNFT/DSponsorNFT.js";

class AdSpaceRenderer {
    constructor(props) {
        this.contract = new DSponsorNFT({
            address: props?.contract,
        });
        this.selector = props.selector;
        this.selection = props.selection;



        this.ads = {};
    }

    async preload(){
        const supply = await this.contract.getTotalSupply();

        const maxSupply = await this.contract.getMaxSupply();
        // We assume linear distribution
        console.log(`Supply: ${supply} / ${maxSupply}`)

        const ads = await this.contract.getAds();

        this.ads = ads;
    }

    select(selection) {
        // selection 'random 1', 'grid 2x2'
        // only ad data selected
        const [type, count] = selection.split(' ');
        const adList = Object.values(this.ads);
        const selectedAds = [];

        switch (type) {
            case 'random':
                const randomAds = adList.sort(() => Math.random() - 0.5);
                selectedAds.push(randomAds.slice(0, count));
                break;
            case 'grid':
                const gridAds = adList.slice(0, count);
                selectedAds.push(gridAds);
                break;
            // case 'carousel':
            //     const carouselAds = adList.slice(0, count);
            //     selectedAds.push(carouselAds);
            //     break;
        }

        return selectedAds;
    }

    render() {
        const div = document.getElementById(this.selector);
        div.style.backgroundColor = 'red';

        console.log(this.ads);

        const newDiv = document.createElement('div');
        newDiv.style.backgroundColor = 'blue';
        newDiv.innerHTML = 'Hello World';
        div.appendChild(newDiv);

        return newDiv;
    }

    static fromContract(contract, props = {}) {
        // const
        console.log(contract, props)

        const selector = props.selector ?? 'dsponsor';
        const selection = props.selection ?? 'grid 10';

        const renderer = new AdSpaceRenderer({
            contract,
            selector,
            selection
        });

        return renderer;
    }


}

export default AdSpaceRenderer;
