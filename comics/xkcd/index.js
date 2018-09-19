class XKCD extends IComic {
    constructor(currentComicElement, currentComicURL) {
        super(currentComicElement, currentComicURL);
        this.hostUrl = 'https://xkcd.com';
    }

    lastComic() {
        this.loadComic(this.hostUrl, comicNumber => this.lastComicNumber = comicNumber);
    }

    randomComic() {
        this.loadComic(`${this.hostUrl}/${~~(this.lastComicNumber * Math.random())}`);
    }

    nextComic() {
        if (this.currentComicTag != null)
            this.loadComic(`${this.hostUrl}/${this.currentComicTag + 1}/`);
    }

    prevComic() {
        if (this.currentComicTag != null)
            this.loadComic(`${this.hostUrl}/${this.currentComicTag - 1}/`);
    }

    shareComic(ev) {
        super.shareComic(ev, `${this.hostUrl}/${this.currentComicTag}`)
    }

    loadComic(url, onSuccess) {
        if (this.currentComicElement)
            this.currentComicElement.classList.add('loading');

        let req = new XMLHttpRequest();
        req.open('GET', url);
        req.send();
        req.onloadend = () => {
            if (req.status === 200) {
                this.switchEngine();

                this.currentComicElement.classList.remove('loading');

                this.currentComicURL = new RegExp('https:\\/\\/imgs\\.xkcd\\.com\\/comics\\/\\w*\\.png', 'gm').exec(req.responseText)[0];
                this.currentComicTag = parseInt(new RegExp('https:\\/\\/xkcd\\.com\\/(\\d*)\\/').exec(req.responseText)[1]);

                if (onSuccess)
                    onSuccess(this.currentComicTag);

                let comicNumberElement = document.getElementById('comicNumber');
                comicNumberElement.innerText = `#${this.currentComicTag}`;
                comicNumberElement.setAttribute('href', `https://xkcd.com/${this.currentComicTag}`);

                this.currentComicElement.setAttribute('src', this.currentComicURL);
            }
            else setTimeout(loadComic, 500, url, onSuccess);
        }
    }
}