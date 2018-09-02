function jsonCb(data) {
    const resultsArr = data.query.search;
    const resultsContainer = document.getElementById('resultsContainer');

    resultsArr.forEach((el, idx) => {
        const title = app.makeTextInHeader(el.title, document.createElement('h2'));
        const paragraph = document.createElement('p');
        paragraph.innerHTML = el.snippet;
        const anchorTag = document.createElement('a');
        anchorTag.setAttribute('target', '_blank');
        anchorTag.setAttribute('href', `https://en.wikipedia.org/wiki/${el.title}`);
        anchorTag.appendChild(title);
        anchorTag.appendChild(paragraph);
        const delayedAppend = () => resultsContainer.appendChild(anchorTag);
        // animate in each result on to page in 200ms intervals
        setTimeout(delayedAppend, 200 * (idx+1));
    });
}

const app = (function() {
    const mainContainer = document.getElementById('mainContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    const inputTag = document.getElementById('inputTag');
    const wikiUrl1 = 'https://en.wikipedia.org/w/api.php?&action=query&prop=links&format=json&callback=jsonCb&list=search&continue=&srsearch=';
    const wikiUrl2 = '&srwhat=text&srprop=timestamp|snippet';
    const makeScriptTagAndInsertInBody = (queryStr) => {
        const url = wikiUrl1 + queryStr + wikiUrl2;
        const scriptTag = document.createElement('script');
        scriptTag.src = url;
        document.body.appendChild(scriptTag);

    }

    const makeTextNodeAndAppendToHeaderTag = (str, element) => element.appendChild(document.createTextNode(str));

    const inputTagKeyDownhandler = (e) => {
        const enterKeyPressed = e.keyCode === 13;
        if(e.target.id === 'inputTag' && enterKeyPressed) {
            while(resultsContainer.firstElementChild) {
                resultsContainer.removeChild(resultsContainer.firstElementChild);
            }
            const userQueryStr = inputTag.value.trim().replace(/\s+/g, '%20');
            makeScriptTagAndInsertInBody(userQueryStr);
        }
    };
    mainContainer.addEventListener('keydown', inputTagKeyDownhandler, false);

    return {
        makeTextInHeader: makeTextNodeAndAppendToHeaderTag
    };
})();