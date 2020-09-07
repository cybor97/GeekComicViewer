class SMBC extends IComic {
    constructor(currentComicElement, currentComicURL) {
        super(currentComicElement, currentComicURL);
        this.hostUrl = 'https://smbc-comics.com';
    }

    lastComic() {
        this.loadComic(this.hostUrl);
    }

    randomComic() {
        if (this.currentComicElement)
            this.toggleLoading(true);

        let req = new XMLHttpRequest();
        req.open('GET', this.withCorsBypass(`${this.hostUrl}/rand.php`));
        req.setRequestHeader('x-requested-with', 'xhr');
        req.send();
        req.onloadend = () => {
            if (req.status === 200)
                this.loadComic(`${this.hostUrl}/comic/${req.responseText.split('"')[1]}`);
        }

    }

    nextComic() {
        if (this.nextComicTag != null)
            this.loadComic(`${this.hostUrl}/comic/${this.nextComicTag}/`);
    }

    prevComic() {
        if (this.prevComicTag != null)
            this.loadComic(`${this.hostUrl}/comic/${this.prevComicTag}/`);
    }

    shareComic(ev) {
        if(this.currentComicTag)
            super.shareComic(ev, `${this.hostUrl}/comic/${this.currentComicTag}`);
    }

    loadComic(url, onSuccess) {
        if (this.currentComicElement)
            this.toggleLoading(true);

        let req = new XMLHttpRequest();
        req.open('GET', this.withCorsBypass(url));
        req.setRequestHeader('x-requested-with', 'xhr');
        req.send();
        req.onloadend = () => {
            if (req.status === 200) {
                this.switchEngine();

                this.toggleLoading(false);

                this.currentComicTag = new RegExp('<input.*"permalinktext".*value=".*comic\\/(.*)".*?>', 'gm').exec(req.responseText);
                this.currentComicTag = this.currentComicTag && this.currentComicTag[1];

                this.currentComicURL = new RegExp(`id="cc-comicbody".*src="(.*\\.[a-z]*)"`, 'gm').exec(req.responseText)[1];

                this.prevComicTag = new RegExp('<a class="cc-prev" rel="prev" href="[a-z0-9\\.\\/:-]*comic\\/([a-z0-9-]*)">', 'gm').exec(req.responseText);
                this.prevComicTag = this.prevComicTag && this.prevComicTag[1];

                this.nextComicTag = new RegExp('<a class="cc-next" rel="next" href="[a-z0-9\\.\\/:-]*comic\\/([a-z0-9-]*)">', 'gm').exec(req.responseText);
                this.nextComicTag = this.nextComicTag && this.nextComicTag[1];

                if (onSuccess)
                    onSuccess(this.currentComicTag);

                this.comicNumberElement.innerText = `#${this.currentComicTag}`;
                this.comicNumberElement.setAttribute('href', `${this.hostUrl}/comic/${this.currentComicTag}`);

                this.currentComicElement.setAttribute('src', this.currentComicURL);
            }
            else setTimeout(this.loadComic, 500, url, onSuccess);
        }
    }
}