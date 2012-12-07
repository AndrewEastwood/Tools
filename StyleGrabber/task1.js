console.log("********** style grabber *********");
var system = require("system");
var pageUrl = "" || system.args[1];
var elementsMap = {
    'Review Titles' : {
        'path' : '.BVRRReviewTitle',
        'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
    },
    'Section Header' : {
        'path' : '.BVRRUserNicknamePrefix',
        'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
    }
};

//console.log(JSON.stringify(elementsMap));

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

    console.log("[INFO] Status: " + status);
    if (status == "success") { 
        console.log("[INFO] Page is downloaded");
        if (!onPageSuccessCalled) {
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
    
    var f = fs.open("task1results.json", 'w');
    f.write(JSON.stringify(jsonData));
    f.close();
    
}

function grabCssProperties(page, elMap) {

    // fetch css properties usign elementsMap
    return page.evaluate(function(elMap) {
        // inner style container
        var _fetchedStyles = {};
        // loop by elemenets
        for(var elKey in elMap) {
        
            var currElem = elMap[elKey];
        
            // get element
            console.log("[INFO] Retriving element " + currElem.path);
            var elem = document.querySelector(currElem.path);
            // add it into the cintainer if it's new
            if (!!!_fetchedStyles[elKey])
                _fetchedStyles[elKey] = {};
            //_fetchedStyles[elKey] = currElem.path;
            
            // fetch definded css props
            for (var i = 0; i < currElem.cssProps.length; i++)
                _fetchedStyles[elKey][currElem.cssProps[i]] = window.getComputedStyle(elem, null).getPropertyValue(currElem.cssProps[i]);
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