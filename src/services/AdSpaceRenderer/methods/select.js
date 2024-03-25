/**
 * Selects ads based on the provided selection criteria.
 * @param {string} selection The selection criteria, e.g., 'random 1', 'grid 2x2'.
 * @returns {Array} An array of selected ads.
 */
export default function select(selection) {
    const [type, count] = selection.split(' ');
    const adList = Object.values(this.ads);
    let selectedAds = [];

    switch (type) {
        case 'random':
            selectedAds = adList.sort(() => Math.random() - 0.5).slice(0, parseInt(count));
            break;
        case 'grid':
            const [rows, cols] = count.split('x') ?? [1, count];
            const grid = [];
            // List of array of available id without those in adList as string
            let availableSlots = this.offer.allowedTokens;
            // let availableSlots = Array.from({ length: parseInt(this.offer.maxSupply) }, (_, i) => i + 1).map(String);


            for (let i = 0; i < rows; i++) {
                // We need to create a row of ads, with placeholders for empty slots
                const row = []
                for(let j = 0; j < cols; j++) {
                    const ad = adList[i * cols + j];
                    if(ad) {
                        row.push(ad);
                        availableSlots = availableSlots.filter(slot => slot !== ad.tokenId);
                    } else {
                        row.push({
                            offerId: this.offerId,
                            tokenId: availableSlots.pop(),
                            records: {
                                text: 'Buy',
                                linkURL: 'https://dsponsor.com',
                            }
                        });
                    }
                }
                grid.push(row);
            }
            selectedAds = grid;
            console.log({ selectedAds });
            break;
    }
    return selectedAds;
}
