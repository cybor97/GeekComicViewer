const xkcd = new XKCD(null, null);
const commitStrip = new CommitStrip(null, null);
const dilbert = new Dilbert(null, null);
const smbc = new SMBC(null, null);
const donthitsave = new DontHitSave(null, null);

xkcd.lastComic();

document.addEventListener('DOMContentLoaded', () => {
    Commons.prevComicButton = document.getElementById('prevComicButton');
    Commons.nextComicButton = document.getElementById('nextComicButton');
    Commons.randomComicButton = document.getElementById('randomComicButton');

    Commons.shareButtons = [
        document.getElementById('shareThroughVK'),
        document.getElementById('shareThroughFB')
    ];

    Commons.currentComicElement = document.getElementById('currentComic');
    Commons.comicNumberElement = document.getElementById('comicNumber');

    for (let element of document.getElementsByClassName('enginesListSwitcher')) {
        element.onclick = (ev) => {
            if (element.parentElement.classList.contains('active') &&
                ev.target.parentElement.classList.contains('enginesList')) {
                let engineName = ev.target.innerText;

                switch (engineName.toLowerCase()) {
                    case 'xkcd':
                        xkcd.switchEngine().lastComic();
                        break;
                    case 'commitstrip':
                        commitStrip.switchEngine().lastComic();
                        break;
                    case 'dilbert':
                        dilbert.switchEngine().lastComic();
                        break;
                    case 'smbc':
                        smbc.switchEngine().lastComic();
                        break;
                    case 'donthitsave':
                        donthitsave.switchEngine().lastComic();
                        break;

                    default:
                        engineName = 'Engine not found';
                        break;
                }

                document.getElementById('enginesListSwitcher').innerHTML = `${engineName} &#9660;`;
            }
            element.parentElement.classList.toggle('active');
        }
    }
}, false);
