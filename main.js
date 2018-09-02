let currentComic = null;
let currentComicNumber = null;
randomComic();

function randomComic() {
    loadComic('https://c.xkcd.com/random/comic/');
}

function nextComic() {
    if (currentComicNumber != null)
        loadComic(`https://xkcd.com/${currentComicNumber + 1}/`);
}

function prevComic() {
    if (currentComicNumber != null)
        loadComic(`https://xkcd.com/${currentComicNumber - 1}/`);
}

function shareComic(ev) {
    if (currentComicNumber != null) {
        const windowProperties = "menubar=0,status=0,height=500,width=500,position=center";
        const comicLink = `https://xkcd.com/${currentComicNumber}`;
        switch (ev.target.id) {
            case "shareThroughVK": window.open(`http://vk.com/share.php?url=${comicLink}`,
                "Share via VK", windowProperties);
            case "shareThroughFB": window.open(`https://www.facebook.com/sharer/sharer.php?u=${comicLink}`,
                "Share via Facebook", windowProperties);
            case "shareThroughGP": window.open(`https://plus.google.com/share?url=${comicLink}`,
                "Share via Google Plus", windowProperties);
        }
    }
}

function loadComic(url) {
    if (currentComic)
        currentComic.classList.add('loading');

    let req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();
    req.onloadend = () => {
        if (req.status === 200) {
            if (!currentComic) {
                currentComic = document.getElementById('currentComic');
                currentComic.onclick = randomComic;

                document.getElementById('prevComicButton').onclick = prevComic;
                document.getElementById('nextComicButton').onclick = nextComic;
                document.getElementById('randomComicButton').onclick = randomComic;

                document.getElementById('shareThroughVK').onclick = shareComic;
                document.getElementById('shareThroughFB').onclick = shareComic;
                document.getElementById('shareThroughGP').onclick = shareComic;
            }

            currentComic.classList.remove('loading');

            let currentComicURL = new RegExp('https:\\/\\/imgs\\.xkcd\\.com\\/comics\\/\\w*\\.png', 'gm').exec(req.responseText)[0];
            currentComicNumber = parseInt(new RegExp('https:\\/\\/xkcd\\.com\\/(\\d*)\\/').exec(req.responseText)[1]);

            let comicNumberElement = document.getElementById('comicNumber');
            comicNumberElement.innerText = `#${currentComicNumber}`;
            comicNumberElement.setAttribute('href', `https://xkcd.com/${currentComicNumber}`);

            currentComic.setAttribute('src', currentComicURL);
        }
        else setTimeout(loadComic, 500, url);
    }
}