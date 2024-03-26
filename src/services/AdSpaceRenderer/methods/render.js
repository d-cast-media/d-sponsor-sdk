const mockCreateElement = (el) => {
    return {
        style: {},
        childrens: [],
        sheet: {
            insertRule: () => {
            }
        },
        appendChild(node) {
            this.childrens.push(node)
        }
    }
}
/**
 * Renders the selected ads into the specified DOM element in a grid pattern.
 * @param {Object} options The options for rendering the ads.
 * @param {string} options.theme The theme for the ad space.
 * @param {string} options.tokenData The token data for the ad space.
 * @param {string} options.referral The referral code for the ad space.
 * @returns {HTMLElement} The newly created div element containing the ad.
 */
export default function render(options = {}) {
    console.log('AdSpaceRenderer: Rendering ads...');
    function createElement(el) {
        if (typeof document !== 'undefined') {
            return document.createElement(el);
        }
        return mockCreateElement(el);
    }

    function createTextNode(text) {
        if (typeof document !== 'undefined') {
            return document.createTextNode(text);
        }
        return text;
    }

    // Creating and appending the style element for responsive design and themes
    const styleElement = createElement('style');

    if (document && document.head) {
        document.head.appendChild(styleElement);
    }

    styleElement.appendChild(createTextNode(`
       .ad-container {
            display: grid;
            max-width: 310px;
            grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
            gap: 5px;
        }
        .ad {
            border: 1px solid black;
            overflow: hidden;
            height: 50px;
            width: 50px;
            justify-content: center;
            align-items: center;
        }
        
        .ad-container.blue-theme {
            color: white;
            background-color: #2d4258;
            border: 1px solid blue;
            border-radius: 5px;
            padding: 10px;
            margin: 10px;
        }
        .ad-container.blue-theme .ad {
            background-color: #7dd3fc;
            color: black;
            border: 1px solid blue;
            border-radius: 5px;
            padding: 1px;
            margin: 5px;
        }
        .ad-container.blue-theme .ad a {
             color: black; 
            text-decoration: none;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%; 
            width: 100%; 
        }
        .ad-container.blue-theme .ad:hover {
            background-color: #4d7f9b;
            color: black;
        }
    `));

    const container = createElement('div');
    container.className = 'ad-container' + (options && options.theme === 'blue' ? ' blue-theme' : '');
    if (!container) {
        console.error('AdSpaceRenderer: Selector not found in document.');
        return;
    }

    container.innerHTML = '';
    const self = this;
    // We need to get our metamask signer
    const dsponsorAdmin = self.admin;

    const ads = this.select(this.selection);
    ads.forEach(adsRow => {
        adsRow.forEach(ad => {
            const adElement = createElement('div');
            adElement.className = 'ad';
            // Remove flex display from adElement
            adElement.style.overflow = 'hidden';
            adElement.style.border = '1px solid black';
            let link = createElement('a');
            if (ad?.records?.['linkURL']) {
                link.href = ad?.records['linkURL'] || '#';
                link.target = '_blank';
            }

            if (ad?.records?.['imageURL']) {
                const image = createElement('img');
                image.src = ad.records['imageURL'] || '';
                image.style.width = '100%';
                image.style.height = 'auto';
                image.style.objectFit = 'cover';
                link.appendChild(image);
            }
            if (ad?.records?.['text']) {
                const text = createElement('p');
                text.textContent = ad.records['text'];
                // FIXME: Optimistic case - Might just be ads data
                // We allow to buy the ad space if no text is provided
                // OnClick event to buy the ad space
                link.onclick = async (e) => {
                    e.preventDefault();

                    const imageURL = window.prompt('Enter the imageURL');
                    if (!prompt) {
                        return;
                    }
                    const linkURL = window.prompt('Enter the linkURL');
                    if (!linkURL) {
                        return;
                    }
                    console.log('AdSpaceRenderer: Buying ad space...');
                    let tokenId = ad.tokenId;
                    const adParameters = ["imageURL","linkURL"]
                    const tokenData = options.tokenData || '0x';
                    const valuePrice = BigInt(self.prices[0]);
                    const bps = self.bps;
                    const fee = (valuePrice * BigInt(bps)) / BigInt(10000); // Calculate fee based on BPS
                    const feeAndValue = valuePrice + fee; // Total value including the fee

                    const mintParameters = {
                        tokenId,
                        to: self.signer.getAddress(),
                        currency: self.currencies[0],
                        tokenData,
                        offerId: self.offerId,
                        adParameters,
                        adDatas: [imageURL, linkURL],
                        referralAdditionalInformation: options?.referral ?? self.referral
                    }
                    try{
                        await dsponsorAdmin.mintAndSubmit(mintParameters, {value:feeAndValue.toString()});
                    } catch (e) {
                        console.error('AdSpaceRenderer: Error buying ad space', e);
                    }
                }

                link.appendChild(text);
            }

            adElement.appendChild(link);
            container.appendChild(adElement); // Append directly to container
        });
    });

    return container;
}
