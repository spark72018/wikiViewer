'use strict';

function jsonCb(data) {
    var resultsArr = data.query.search;
    var resultsContainer = document.getElementById('resultsContainer');

    resultsArr.forEach(function (el, idx) {
        var title = app.makeTextInHeader(el.title, document.createElement('h2'));
        var paragraph = document.createElement('p');
        paragraph.innerHTML = el.snippet;
        var anchorTag = document.createElement('a');
        anchorTag.setAttribute('target', '_blank');
        anchorTag.setAttribute('href', 'https://en.wikipedia.org/wiki/' + el.title);
        anchorTag.appendChild(title);
        anchorTag.appendChild(paragraph);
        var delayedAppend = function delayedAppend() {
            return resultsContainer.appendChild(anchorTag);
        };
        // animate in each result on to page in 200ms intervals
        setTimeout(delayedAppend, 200 * (idx + 1));
    }); //
}

var app = function () {
    var mainContainer = document.getElementById('mainContainer');
    var resultsContainer = document.getElementById('resultsContainer');
    var inputTag = document.getElementById('inputTag');
    var wikiUrl1 = 'https://en.wikipedia.org/w/api.php?&action=query&prop=links&format=json&callback=jsonCb&list=search&continue=&srsearch=';
    var wikiUrl2 = '&srwhat=text&srprop=timestamp|snippet';
    var makeScriptTagAndInsertInBody = function makeScriptTagAndInsertInBody(queryStr) {
        var url = wikiUrl1 + queryStr + wikiUrl2;
        var scriptTag = document.createElement('script');
        scriptTag.src = url;
        document.body.appendChild(scriptTag);
    };

    var makeTextNodeAndAppendToHeaderTag = function makeTextNodeAndAppendToHeaderTag(str, element) {
        return element.appendChild(document.createTextNode(str));
    };

    var inputTagKeyDownhandler = function inputTagKeyDownhandler(e) {
        var enterKeyPressed = e.keyCode === 13;
        if (e.target.id === 'inputTag' && enterKeyPressed) {
            while (resultsContainer.firstElementChild) {
                resultsContainer.removeChild(resultsContainer.firstElementChild);
            }
            var userQueryStr = inputTag.value.trim().replace(/\s+/g, '%20');
            makeScriptTagAndInsertInBody(userQueryStr);
        }
    };
    mainContainer.addEventListener('keydown', inputTagKeyDownhandler, false);

    return {
        makeTextInHeader: makeTextNodeAndAppendToHeaderTag
    };
}();