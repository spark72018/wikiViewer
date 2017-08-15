function jsonCb(data) {
    const resultsArr = data.query.search;
    const resultsContainer = document.getElementById('resultsContainer');
    const appendFirstToSecond = (child, parent) => parent.appendChild(child)
    resultsArr.forEach((el, idx) => {
        const title = app.makeTextInHeader(el.title)(app.make('h2'));
        const paragraph = app.make('p');
        paragraph.innerHTML = el.snippet;
        const anchorTag = app.make('a');
        anchorTag.setAttribute('target', '_blank');
        anchorTag.setAttribute('href', `https://en.wikipedia.org/wiki/${el.title}`);
        anchorTag.appendChild(title);
        anchorTag.appendChild(paragraph);
        const callLater = () => appendFirstToSecond(anchorTag, resultsContainer);
        setTimeout(callLater, 200 * (idx+1));
    });
}    

const app = (function() {
    const make = (elStr) => document.createElement(elStr);
    const mainContainer = document.getElementById('mainContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    const inputTag = document.getElementById('inputTag');
    const wikiUrl1 = 'https://en.wikipedia.org/w/api.php?&action=query&prop=links&format=json&callback=jsonCb&list=search&continue=&srsearch=';
    const wikiUrl2 = '&srwhat=text&srprop=timestamp|snippet';
    const getValueOf = (element) => element.value;
    const makeScriptTagAndInsertInBody = (queryStr) => {
        let url = wikiUrl1 + queryStr + wikiUrl2;
        let scriptTag = make('script');
        scriptTag.src = url;
        document.body.appendChild(scriptTag);

    }

    const makeTextNodeAndAppendToHeaderTag = (str) => (element) => element.appendChild(document.createTextNode(str));

    const inputTagKeyDownhandler = (e) => {
        if(e.target.id === 'inputTag' && e.keyCode === 13) {
            while(resultsContainer.firstElementChild) {
                resultsContainer.removeChild(resultsContainer.firstElementChild);
            }
            const userQueryStr = getValueOf(inputTag).trim().replace(/\s+/g, '%20');
            makeScriptTagAndInsertInBody(userQueryStr);
        }
    };
    mainContainer.addEventListener('keydown', inputTagKeyDownhandler, false);

    return {
        makeTextInHeader: makeTextNodeAndAppendToHeaderTag,
        make: make
    };
})();