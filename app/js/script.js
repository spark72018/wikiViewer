'use strict';

// https://coolors.co/f5ffc6-b4e1ff-ab87ff-fface4-c1ff9b

function jsonCb(data) {
    var resultsArr = data.query.search;
    var resultsContainer = document.getElementById('resultsContainer');
    var appendFirstToSecond = function appendFirstToSecond(child, parent) {
        return parent.appendChild(child);
    };
    resultsArr.forEach(function (el, idx) {
        var title = app.makeTextInHeader(el.title)(app.make('h2'));
        var paragraph = app.make('p');
        paragraph.innerHTML = el.snippet;
        var anchorTag = app.make('a');
        anchorTag.setAttribute('target', '_blank');
        anchorTag.setAttribute('href', 'https://en.wikipedia.org/wiki/' + el.title);
        anchorTag.appendChild(title);
        anchorTag.appendChild(paragraph);
        var callLater = function callLater() {
            return appendFirstToSecond(anchorTag, resultsContainer);
        };
        setTimeout(callLater, 200 * (idx + 1));
    });
}

var app = function () {
    var make = function make(elStr) {
        return document.createElement(elStr);
    };
    var mainContainer = document.getElementById('mainContainer');
    var resultsContainer = document.getElementById('resultsContainer');
    var inputTag = document.getElementById('inputTag');
    var wikiUrl1 = 'https://en.wikipedia.org/w/api.php?&action=query&prop=links&format=json&callback=jsonCb&list=search&continue=&srsearch=';
    var wikiUrl2 = '&srwhat=text&srprop=timestamp|snippet';
    var getValueOf = function getValueOf(element) {
        return element.value;
    };
    function someFn(data) {
        console.log(data);
    }
    var makeScriptTagAndInsertInBody = function makeScriptTagAndInsertInBody(queryStr) {
        var url = wikiUrl1 + queryStr + wikiUrl2;
        var scriptTag = make('script');
        scriptTag.src = url;
        document.body.appendChild(scriptTag);
    };

    var makeTextNodeAndAppendToHeaderTag = function makeTextNodeAndAppendToHeaderTag(str) {
        return function (element) {
            return element.appendChild(document.createTextNode(str));
        };
    };

    var inputTagKeyDownhandler = function inputTagKeyDownhandler(e) {
        if (e.target.id === 'inputTag' && e.keyCode === 13) {
            while (resultsContainer.firstElementChild) {
                resultsContainer.removeChild(resultsContainer.firstElementChild);
            }
            var userQueryStr = getValueOf(inputTag).trim().replace(/\s+/g, '%20');
            makeScriptTagAndInsertInBody(userQueryStr);
        }
    };
    mainContainer.addEventListener('keydown', inputTagKeyDownhandler, false);

    return {
        makeTextInHeader: makeTextNodeAndAppendToHeaderTag,
        make: make
    };
}();