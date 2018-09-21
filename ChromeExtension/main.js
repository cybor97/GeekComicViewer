const xkcd = new XKCD(null, null);
const commitStrip = new CommitStrip(null, null);
const dilbert = new Dilbert(null, null);

xkcd.lastComic();

setTimeout(() => {
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
                    default:
                        engineName = 'Engine not found';
                        break;
                }

                document.getElementById('enginesListSwitcher').innerHTML = `${engineName} &#9660;`;

            }

            element.parentElement.classList.toggle('active');
        }
    }
}, 1);
