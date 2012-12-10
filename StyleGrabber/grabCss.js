console.log("********** style grabber *********");
var system = require("system");
var pageUrl = "http://reviews.pull-ups.com/bvstaging/4123-en_us/test1/reviews.htm?format=embedded" || system.args[1];
var elementsMap = {
    'Review Titles' : {
        'path' : '.BVRRReviewTitle',
        'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
    },
    'Section Header' : {
        'path' : '.BVDITitle ',
        'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
    },
    'Section Header Controls' : {
        'path' : '#BVRRDisplayContentHeaderID ',
        'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
    },
    'Review Text' : {
        'path' : '.BVRRReviewTextContainer',
        'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
    },
    'Review Dates' : {
        'path' : '.BVRRReviewDate',
        'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
    },
    'Reviewer Name' : {
        'path' : '.BVRRUserNickname',
        'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
    },
    'Lables' : {
        'path' : '.BVRRLabel',
        'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
    },
    'Dimension Values' : {
        'path' : '.BVRRRatingNormalOutOf',
        'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
    },
    'Links' : {
        'path' : '.BVRRRootElement a',
        'states' : ['hover', 'active', 'visited'],
        'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
    },
    'Buttons' : {
        'path' : '.BVRRDisplayContentLinkWrite a',
        'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
    }
};

if (!validateUrl(pageUrl)) {
    console.log("[ERROR] Wrong URL");
    phantom.exit();
}

console.log("[INFO] Using the following URL: " + pageUrl);

// fetch data
var page = require('webpage').create();
/*
page.settings.userName = "";
page.settings.password = "";
*/

var onPageSuccessCalled = false;
page.open(pageUrl, function(status){

    console.log("[INFO] Status received : " + status);
    if (status == "success") { 
        if (!onPageSuccessCalled) {
            console.log("[INFO] Page is downloaded");
            window.setInterval(onPageSuccess, 10000);
            onPageSuccessCalled = true;
        }
    } else {
        console.log("[FAILED] Unable to fetch data from the url: " + pageUrl);
        phantom.exit();
    }

});

function onPageSuccess() {
    var elementsStyles = grabCssProperties(page, elementsMap);
    console.log('=================================================');
    // print result
    console.log(JSON.stringify(elementsStyles));
    // save results
    saveData(elementsStyles);
    // exit
    phantom.exit();
}

function saveData (jsonData) {
    var fs = require('fs');
    //var inst = page.injectJs('libs/jsuri-1.1.1.js');
    //console.log(inst?"ok":"failed");
    var f = fs.open(getHostName(pageUrl) + ".json", 'w');
    f.write(JSON.stringify(jsonData));
    f.close();
}

function getHostName (url) {
    // simple hostname parser
    return url.split('/')[2].replace(/\./g, '_')
}

function grabCssProperties(page, elMap) {
    /*page.evaluate(function() {
    });*/
    // fetch css properties usign elementsMap
    return page.evaluate(function(elMap) {

        var cl = document.createElement('link');
        cl.setAttribute('type', 'text/css');
        cl.setAttribute('href', 'http://pullups.ugc.bazaarvoice.com/static/4123-en_us/bazaarvoice.css');
        cl.setAttribute('rel', 'stylesheet');
        document.head.appendChild(cl);
        
        // inner style container
        var _fetchedStyles = {};
        // loop by elemenets
        for(var elKey in elMap) {
            // current element alias
            var currElem = elMap[elKey];
            // get element
            console.log("[INFO] Retriving element " + currElem.path);
            var elem = document.querySelector(currElem.path);
            // add it into the container if it's new
            if (!!!_fetchedStyles[elKey]) {
                _fetchedStyles[elKey] = {};
                // init element's states
                if (!!currElem.states)
                    for (var j = 0; j < currElem.states.length; j++)
                        _fetchedStyles[elKey][currElem.states[j]] = {};
            }
            // fetch definded css props
            for (var i = 0; i < currElem.cssProps.length; i++) {
                // check if we are using states
                if (!!currElem.states) {
                    for (var j = 0; j < currElem.states.length; j++)
                        _fetchedStyles[elKey][currElem.states[j]][currElem.cssProps[i]] = window.getComputedStyle(elem, currElem.states[j]).getPropertyValue(currElem.cssProps[i]);
                }
                else
                    _fetchedStyles[elKey][currElem.cssProps[i]] = window.getComputedStyle(elem, null).getPropertyValue(currElem.cssProps[i]);
            }
        }
        return _fetchedStyles;
    }, elMap);

}

function validateUrl(pgUrl) {
    if (!!!pgUrl)
        return false;
	/* todo: put implementation here */
	return true;
}