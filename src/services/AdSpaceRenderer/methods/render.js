/**
 * Renders the selected ads into the specified DOM element in a grid pattern.
 * @returns {HTMLElement} The newly created div element containing the ad.
 */
export default function render() {
    const container = globalThis.document && document.querySelector(this.selector) || {
        style: {}, childrens: [], appendChild(node) {
            this.childrens.push(node)
        }
    };
    if (!container) {
        console.error('AdSpaceRenderer: Selector not found in document.');
        return;
    }

    container.innerHTML = '';
    // Set up grid styling
    container.style.display = 'grid';
    container.style.gridTemplateRows = `repeat(${this.ads.length}, auto)`; // One row for each array of ads
    container.style.gridGap = '10px';

    // Assuming each ad has a 'url' and 'image' in its records
    const ads = this.select(this.selection);
    ads.forEach(adsRow => {
        const rowElement = (globalThis.document && document.createElement('div') || {
            style: {}, childrens: [], appendChild(node) {
                this.childrens.push(node)
            }
        });
        rowElement.style.display = 'grid';
        rowElement.style.gridTemplateColumns = `repeat(${adsRow.length}, 1fr)`; // One column for each ad
        rowElement.style.gridGap = '10px';


        adsRow.forEach(ad => {
            console.log(ad);
            const adElement = (globalThis.document && document.createElement('div') || {
                style: {}, childrens: [], appendChild(node) {
                    this.childrens.push(node)
                }
            });
            adElement.style.border = '1px solid black';
            adElement.style.display = 'flex';
            adElement.style.justifyContent = 'center';
            adElement.style.alignItems = 'center';
            adElement.style.overflow = 'hidden';

            const image = (globalThis.document && document.createElement('img') || {
                style: {}, childrens: [], appendChild(node) {
                    this.childrens.push(node)
                }
            });
            image.src = ad.records['imageURL'] || ''; // Example to get image URL
            image.style.width = '100%';
            image.style.height = 'auto';
            image.style.objectFit = 'cover';

            const link = (globalThis.document && document.createElement('a') || {
                style: {}, childrens: [], appendChild(node) {
                    this.childrens.push(node)
                }
            });
            link.href = ad.records['linkURL'] || '#'; // Example to get link URL
            link.target = '_blank';
            link.style.position = 'absolute';
            link.style.width = '100%';
            link.style.height = '100%';
            link.appendChild(image)

            adElement.appendChild(link);
            rowElement.appendChild(adElement);
        });

        container.appendChild(rowElement);

    });

    return container;
}
