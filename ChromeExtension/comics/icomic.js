//used as abstract class
class IComic {
    constructor(currentComicElement, currentComicURL) {
        this.currentComicElement = currentComicElement;
        this.currentComicURL = currentComicURL;
    }

    lastComic() {
    }

    randomComic() {
    }

    nextComic() {
    }

    prevComic() {
    }

    toggleLoading(isLoading) {
        if (this.currentComicElement) {
            if (isLoading)
                this.currentComicElement.classList.add('loading');
            else
                this.currentComicElement.classList.remove('loading');
        }
    }

    switchEngine() {
        if (Commons.currentComicElement) {
            this.currentComicElement = Commons.currentComicElement;
            this.currentComicElement.onclick = this.randomComic.bind(this);

            this.comicNumberElement = Commons.comicNumberElement;

            if (Commons.prevComicButton && Commons.nextComicButton && randomComicButton) {
                Commons.prevComicButton.onclick = this.prevComic.bind(this);
                Commons.nextComicButton.onclick = this.nextComic.bind(this);
                Commons.randomComicButton.onclick = this.randomComic.bind(this);
            }
            else {
                console.error('Navigation could not init, buttons are unassigned');
            }

            if (Commons.shareButtons) {
                for (let shareButton of Commons.shareButtons) {
                    shareButton.onclick = this.shareComic.bind(this);
                }
            }
            else {
                console.error('Sharings could not init, buttons are unassigned');
            }

            return this;
        }
        else {
            console.error('Engile could not init, current comic element is unassigned');
            return null;
        }

    }

    shareComic(ev) {
        if (this.currentComicURL != null) {
            const windowProperties = "menubar=0,status=0,height=500,width=500,position=center";
            switch (ev.target.id) {
                case "shareThroughVK": window.open(
                    `http://vk.com/share.php?url=${this.hostUrl}/${this.currentComicTag}`,
                    "Share via VK", windowProperties);
                    break;
                case "shareThroughFB": window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${this.hostUrl}/${this.currentComicTag}`,
                    "Share via Facebook", windowProperties);
                    break;
                case "shareThroughGP": window.open(
                    `https://plus.google.com/share?url=${this.hostUrl}/${this.currentComicTag}`,
                    "Share via Google Plus", windowProperties);
                    break;
            }
        }
    }

    loadComic(url, onSuccess) {
    }
}