class UrlModel {
    constructor(longUrl, shortUrl, expiryTime, maxClicks) {
        this.longUrl = longUrl;
        this.shortUrl = shortUrl;
        this.expiryTime = expiryTime || null;
        this.maxClicks = maxClicks || null;
        this.clicks = 0;
        this.analytics = [];
    }
}

module.exports = UrlModel;
