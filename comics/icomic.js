//used as abstract class
class IComic {
    //TODO:Refactor(+implementations), should NOT contain UI elements
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
        this.currentComicElement = document.getElementById('currentComic');
        this.currentComicElement.onclick = this.randomComic.bind(this);

        document.getElementById('prevComicButton').onclick = this.prevComic.bind(this);
        document.getElementById('nextComicButton').onclick = this.nextComic.bind(this);
        document.getElementById('randomComicButton').onclick = this.randomComic.bind(this);

        document.getElementById('shareThroughVK').onclick = this.shareComic.bind(this);
        document.getElementById('shareThroughFB').onclick = this.shareComic.bind(this);
        document.getElementById('shareThroughGP').onclick = this.shareComic.bind(this);

        return this;
    }

    shareComic(ev) {
        if (this.currentComicURL != null) {
            const windowProperties = "menubar=0,status=0,height=500,width=500,position=center";
            switch (ev.target.id) {
                case "shareThroughVK": window.open(`http://vk.com/share.php?url=${this.currentComicURL}`,
                    "Share via VK", windowProperties);
                    break;
                case "shareThroughFB": window.open(`https://www.facebook.com/sharer/sharer.php?u=${this.currentComicURL}`,
                    "Share via Facebook", windowProperties);
                    break;
                case "shareThroughGP": window.open(`https://plus.google.com/share?url=${this.currentComicURL}`,
                    "Share via Google Plus", windowProperties);
                    break;
            }
        }
    }

    loadComic(url, onSuccess) {
    }
}