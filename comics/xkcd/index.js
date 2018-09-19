class XKCD extends IComic {
    constructor(currentComicElement, currentComicNumber) {
        super(currentComicElement, currentComicNumber);
    }

    lastComic() {
        this.loadComic('https://xkcd.com/', comicNumber => this.lastComicNumber = comicNumber);
    }

    randomComic() {
        this.loadComic(`https://xkcd.com/${~~(this.lastComicNumber * Math.random())}`);
    }

    nextComic() {
        if (this.currentComicNumber != null)
            this.loadComic(`https://xkcd.com/${this.currentComicNumber + 1}/`);
    }

    prevComic() {
        if (this.currentComicNumber != null)
            this.loadComic(`https://xkcd.com/${this.currentComicNumber - 1}/`);
    }

    shareComic(ev) {
        super.shareComic(ev, `https://xkcd.com/${this.currentComicNumber}`)
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
                this.currentComicNumber = parseInt(new RegExp('https:\\/\\/xkcd\\.com\\/(\\d*)\\/').exec(req.responseText)[1]);

                if (onSuccess)
                    onSuccess(this.currentComicNumber);

                let comicNumberElement = document.getElementById('comicNumber');
                comicNumberElement.innerText = `#${this.currentComicNumber}`;
                comicNumberElement.setAttribute('href', `https://xkcd.com/${this.currentComicNumber}`);

                this.currentComicElement.setAttribute('src', this.currentComicURL);
            }
            else setTimeout(loadComic, 500, url, onSuccess);
        }
    }
}