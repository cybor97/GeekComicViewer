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

function shareComic() {
    if (currentComicNumber != null) {

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
            }

            currentComic.classList.remove('loading');

            let currentComicURL = new RegExp('https:\\/\\/imgs\\.xkcd\\.com\\/comics\\/\\w*\\.png', 'gm').exec(req.responseText)[0];
            currentComicNumber = parseInt(new RegExp('https:\\/\\/xkcd\\.com\\/(\\d*)\\/').exec(req.responseText)[1]);

            let comicNumberElement = document.getElementById('comicNumber');
            comicNumberElement.innerText = `#${currentComicNumber}`;
            comicNumberElement.setAttribute('href', `https://xkcd.com/${currentComicNumber}`);

            let shareThroughVKElement = document.getElementById('shareThroughVK');
            shareThroughVKElement.onclick = () =>
                window.open(`http://vk.com/share.php?url=https://xkcd.com/${currentComicNumber}`,
                    "Share via VK", "menubar=0,status=0,height=500,width=500,position=center");

            currentComic.setAttribute('src', currentComicURL);
        }
        else setTimeout(loadComic, 500, url);
    }
}