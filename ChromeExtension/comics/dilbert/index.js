//TODO: Refactor!
class Dilbert extends IComic {
    constructor(currentComicElement, currentComicURL) {
        super(currentComicElement, currentComicURL);
        this.hostUrl = 'http://dilbert.com';
    }

    lastComic() {
        this.loadComic(`${this.hostUrl}/${new Date().toISOString().split('T')[0]}`,
            comicTag => this.lastComicTag = this.currentComicTag = comicTag);
    }

    randomComic() {
        const now = Date.now();
        const min = 608688000000;//1989-04-16, first page

        this.loadComic(`${this.hostUrl}/${new Date(Math.random() * (now - min) + min).toISOString().split('T')[0]}`,
            comicTag => this.currentComicTag = comicTag);
    }

    nextComic() {
        if (this.currentComicTag) {
            let date = new Date(this.currentComicTag)
            date = new Date(date.getTime() + 24 * 3600 * 1000);
            this.loadComic(`${this.hostUrl}/${date.toISOString().split('T')[0]}`,
                comicTag => this.currentComicTag = comicTag);
        }
    }

    prevComic() {
        if (this.currentComicTag) {
            let date = new Date(this.currentComicTag)
            date = new Date(date.getTime() - 24 * 3600 * 1000);
            this.loadComic(`${this.hostUrl}/${date.toISOString().split('T')[0]}`,
                comicTag => this.currentComicTag = comicTag);
        }
    }

    shareComic(ev) {
        super.shareComic(ev, `${this.currentComicURL}`)
    }

    loadComic(url, onSuccess) {
        if (this.currentComicElement)
            this.toggleLoading(true);

        let req = new XMLHttpRequest();
        req.open('GET', url);
        req.send();
        req.onloadend = () => {
            if (req.status === 200) {
                this.switchEngine();

                this.currentComicTag = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}', 'g').exec(req.responseURL)[0];

                this.toggleLoading(false);

                this.currentComicURL =
                    new RegExp('http:\\/\\/assets.amuniversal.com\\/\\w*', 'gm').exec(req.responseText)[0];


                if (onSuccess)
                    onSuccess(this.currentComicTag);

                this.comicNumberElement.innerText = `#${this.currentComicTag}`;
                this.comicNumberElement.setAttribute('href', req.responseURL);

                this.currentComicElement.setAttribute('src', this.currentComicURL);
            }
            else setTimeout(this.loadComic, 500, url, onSuccess);
        }
    }

}