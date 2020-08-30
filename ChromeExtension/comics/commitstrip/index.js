//TODO: Refactor!
class CommitStrip extends IComic {
    constructor(currentComicElement, currentComicURL) {
        super(currentComicElement, currentComicURL);
        this.hostUrl = 'https://www.commitstrip.com';
    }

    lastComic() {
        let req = new XMLHttpRequest();
        this.toggleLoading(true);
        req.open('GET', this.withCorsBypass(this.hostUrl));
        req.send();
        req.onloadend = () => {
            if(req.status === 200) {
                const comicPageURL = new RegExp('(http|https):\\/\\/www\\.commitstrip\\.com\\/\\w*\\/\\w*\\/\\w*\\/[a-zA-Z0-9_-]*\\/', 'mg')
                    .exec(req.responseText)[0];

                this.loadComic(comicPageURL, comicTag => this.lastComicTag = this.currentComicTag = comicTag);
            }
        }
    }

    randomComic() {
        this.loadComic(`${this.hostUrl}/?random=1`, comicTag => this.currentComicTag = comicTag);
    }

    nextComic() {
        if (this.nextComicURL)
            this.loadComic(this.nextComicURL, comicTag => this.currentComicTag = comicTag);
    }

    prevComic() {
        if (this.prevComicURL)
            this.loadComic(this.prevComicURL, comicTag => this.currentComicTag = comicTag);
    }

    shareComic(ev) {
        super.shareComic(ev, `${this.currentComicURL}`)
    }

    loadComic(url, onSuccess) {
        if (this.currentComicElement)
            this.toggleLoading(true);

        let req = new XMLHttpRequest();
        req.open('GET', this.withCorsBypass(url));
        // req.setRequestHeader('x-requested-with', 'xhr');
        req.send();
        req.onloadend = () => {
            if (req.status === 200) {
                this.switchEngine();

                this.currentComicTag = new RegExp('\/([a-z0-9]*-[a-z0-9-]*)\/', 'g').exec(req.responseURL)[1];

                const urlMatcher = '((http|https):\\/\\/www\\.commitstrip\\.com\\/\\w*\\/\\w*\\/\\w*\\/[a-zA-Z0-9_-]*\\/)';

                const prevMatch = new RegExp(`href="${urlMatcher}" rel="prev"`, 'gm').exec(req.responseText);
                if (prevMatch)
                    this.prevComicURL = prevMatch[1];

                const nextMatch = new RegExp(`href="${urlMatcher}" rel="next"`, 'gm').exec(req.responseText);
                if (nextMatch)
                    this.nextComicURL = nextMatch[1];


                this.toggleLoading(false);

                this.currentComicURL =
                    new RegExp('(http|https):\\/\\/www\\.commitstrip\\.com\\/wp-content\\/uploads\\/\\w*\\/\\w*\\/Strip.*\\.jpg', 'gm')
                        .exec(req.responseText)[0];


                if (onSuccess)
                    onSuccess(this.currentComicTag);

                this.comicNumberElement.innerText = `#${this.currentComicTag}`;
                this.comicNumberElement.setAttribute('href', this.cutCorsBypass(req.responseURL));

                this.currentComicElement.setAttribute('src', this.currentComicURL);
            }
            else setTimeout(this.loadComic, 500, url, onSuccess);
        }
    }

}