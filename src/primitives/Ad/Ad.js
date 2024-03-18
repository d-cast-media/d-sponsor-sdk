class Ad {
    constructor({ offerId, tokenId }) {
        this.offerId = offerId;
        this.tokenId = tokenId;
        this.records = {};
    }

    addRecord({ provider = '', kind, ratio = '', size = '', value }) {
        if (!kind) {
            throw new Error('Kind is required for ad records');
        }
        const key = this.generateKey({ provider, kind, ratio, size });
        this.records[key] = value;
    }

    getRecord({ provider = '', kind, ratio = '', size = '' }) {
        const key = this.generateKey({ provider, kind, ratio, size });
        return this.records[key];
    }

    // Helper method to generate deterministic keys
    generateKey({ provider, kind, ratio, size }) {
        return `${provider}-${kind}-${ratio}-${size}`.replace(/--+/g, '-').trim('-');
    }

    serialize() {
        return JSON.stringify({
            offerId: this.offerId,
            tokenId: this.tokenId,
            records: this.records,
        });
    }

    static deserialize(adString) {
        const { offerId, tokenId, records } = JSON.parse(adString);
        const ad = new Ad({ offerId, tokenId });
        ad.records = records;
        return ad;
    }
}

export default Ad;
