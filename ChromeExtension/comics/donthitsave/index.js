class DontHitSave extends IComic {
    constructor(currentComicElement, currentComicURL) {
        super(currentComicElement, currentComicURL);
        this.hostUrl = 'https://donthitsave.com';
    }

    lastComic() {
        this.loadComic(this.hostUrl);
    }

    randomComic() {
        if (this.randomComicTag != null)
            this.loadComic(`${this.hostUrl}/comic/${this.randomComicTag}`);
    }

    nextComic() {
        if (this.nextComicTag != null)
            this.loadComic(`${this.hostUrl}/comic/${this.nextComicTag}`);
    }

    prevComic() {
        if (this.prevComicTag != null)
            this.loadComic(`${this.hostUrl}/comic/${this.prevComicTag}`);
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

                this.currentComicTag = new RegExp('<meta property="og:url" content="(.*)" />', 'gm').exec(req.responseText);
                this.currentComicTag = this.currentComicTag && this.currentComicTag[1].split('/comic/')[1];

                this.currentComicURL = new RegExp('<meta property="og:image" content="(.*)" />', 'gm').exec(req.responseText);
                this.currentComicURL = this.currentComicURL && this.currentComicURL[1];

                this.prevComicTag = new RegExp('<a href="([^"]*)" class="nav-button nav-button-left">', 'gm').exec(req.responseText);
                this.prevComicTag = this.prevComicTag && this.prevComicTag[1].split('/comic/')[1];

                this.randomComicTag = new RegExp('<a href="([^"]*)" class="nav-button nav-button-left">', 'gm').exec(req.responseText);
                this.randomComicTag = this.randomComicTag && this.randomComicTag[1].split('/comic/')[1];

                this.nextComicTag = new RegExp('<a href="([^"]*)" class="nav-button nav-button-left nav-end">', 'gm').exec(req.responseText);
                this.nextComicTag = this.nextComicTag && this.nextComicTag[1].split('/comic/')[1] && this.nextComicTag[1].split('/comic/')[1];

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