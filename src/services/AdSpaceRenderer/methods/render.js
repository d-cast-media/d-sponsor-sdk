/**
 * Renders the selected ads into the specified DOM element in a grid pattern.
 * @returns {HTMLElement} The newly created div element containing the ad.
 */
export default function render() {
    const container = document.getElementById(this.selector);
    if (!container) {
        console.error('AdSpaceRenderer: Selector not found in document.');
        return;
    }

    // Clear existing content
    container.innerHTML = '';
    // Set up grid styling
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(100px, 1fr))'; // Adjust minmax as needed
    container.style.gridGap = '10px';
    container.style.backgroundColor = 'white'; // or any other desired background color

    // Assuming each ad has a 'url' and 'image' in its records
    const ads = this.select(this.selection);
    ads.forEach(ad => {
        const adElement = document.createElement('div');
        adElement.style.border = '1px solid black';
        adElement.style.display = 'flex';
        adElement.style.justifyContent = 'center';
        adElement.style.alignItems = 'center';
        adElement.style.overflow = 'hidden';
        adElement.style.position = 'relative';

        const image = document.createElement('img');
        image.src = ad.records['image-1x1'] || ''; // Example to get image URL
        image.style.width = '100%';
        image.style.height = '100%';
        image.style.objectFit = 'cover';

        const link = document.createElement('a');
        link.href = ad.records['link'] || '#'; // Example to get link URL
        link.target = '_blank';
        link.style.position = 'absolute';
        link.style.width = '100%';
        link.style.height = '100%';
        link.appendChild(image);

        adElement.appendChild(link);
        container.appendChild(adElement);
    });

    return container;
}
