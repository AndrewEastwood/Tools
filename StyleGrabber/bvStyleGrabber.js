(function (w) {

    var bvSG = {};
    var settingsPublic = {
        auth: {
            user: "",
            pwd: ""
        },
        client: {
            clientName: "",
            host: "",
            displayCode: "",
            isApiHostname: false
        },
        productExternalID : "test1",
        testEnvironment : "bvstaging",
        pageFormat : "noscript",
        resourceFolder : "customers/"
    };
    var settings = {
        elementsMap_bhive : {
            ratingIcons: {
                'summaryStars.subStyles.full.color': {
                    'path' : '.BVRRSecondaryRatingsContainer'
                },
                'summaryStars.subStyles.empty.color': {
                    'path' : '.BVRRSecondaryRatingsContainer'
                },
                bars: {},
                reviewStars: {}
            },
            'configuredStyles.fonts.body.size' : {
                'path' : '.BVRRRootElement',
                'cssProps' : ['font-size']
            }
        },
        elementsMap : {
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
        }
    };
    var grabberTasks = {
        grabCssProperties : {
            state: false,
            data :false
        },
        grabRatingStars : {
            state: false,
            data: false
        }
    };
    var rerunThreshold = 3;

    bvSG.init = function (config) {
        extend(settingsPublic, config);
        return bvSG;
    };

    bvSG.grabLink = function (pageUrl) {
        innerLog("--- using page url: " + pageUrl, "info");
        var pageObj = getPageObject(pageUrl, false);
        if (pageObj.isValid()) {
            innerLog("Working with: " + pageObj.getUrl(), "info");
            grabber(pageObj); 
        }
    };

    bvSG.grab = function (clientName, displayCode, isApiHostname, productExternalID, testEnvironment, host, updateSettings) {

        // update settings
        if (updateSettings) {
            if (!!clientName)
                settingsPublic.client.clientName = clientName;
            if (!!displayCode)
                settingsPublic.client.displayCode = displayCode;
            if (!!isApiHostname)
                settingsPublic.client.isApiHostname = !!isApiHostname;
            if (!!productExternalID)
                settingsPublic.productExternalID = productExternalID;
            if (!!testEnvironment)
                settingsPublic.testEnvironment = testEnvironment;
            if (!!host)
                settingsPublic.client.host = host;
        }

        var pageObj = getPageObject(
                clientName || settingsPublic.client.clientName,
                displayCode || settingsPublic.client.displayCode,
                !!(isApiHostname || settingsPublic.client.isApiHostname),
                productExternalID || settingsPublic.productExternalID,
                testEnvironment || settingsPublic.testEnvironment,
                host || settingsPublic.client.host,
                settingsPublic.pageFormat);

        innerLog("--- client name: " + pageObj.clientName, "info");
        innerLog("--- host name: " + pageObj.host, "info");
        innerLog("--- display code: " + pageObj.displayCode, "info");
        innerLog("--- using api host name: " + ((pageObj.isApiHostname)? "yes" : "no"), "info");
        innerLog("--- test environment : " + pageObj.testEnvironment, "info");
        innerLog("--- product external id : " + pageObj.productExternalID, "info");

        if (pageObj.isValid()) {
            innerLog("Working with: " + pageObj.getUrl(), "info");
            grabber(pageObj); 
        }
    };

    function grabber(pageObj) {
        // create web page
        pageObj.webPageObject = require('webpage').create();
        // setup event handlers
        pageObj.webPageObject.onConsoleMessage = function (msg){
            innerLog(msg, "info");
        };
        // use auth settings
        if (settingsPublic.auth.user) {
            innerLog("Auth is required. Using user login to connect: " + settingsPublic.auth.user, "info");
            page.settings.userName = settingsPublic.auth.user;
        }
        if (settingsPublic.auth.pwd) {
            page.settings.password = settingsPublic.auth.pwd;
        }
        // start
        var onPageSuccessCalled = false;
        pageObj.webPageObject.open(pageObj.getUrl(), function(status) {
            innerLog("Status received = " + status, "info");
            if (status == "success") { 
                if (!onPageSuccessCalled) {
                    innerLog("Page is downloaded", "info");
                    //console.log(page);
                    window.setInterval(function(){ onPageSuccess(pageObj); }, 5000);
                    onPageSuccessCalled = true;
                }
            } else {
                innerLog("Unable to fetch data from the url", "failed");
                phantom.exit();
            }
        });
    }

    function onPageSuccess(pageObj) {
        innerLog("Event Triggered: onPageSuccess", "info");
        var needToRerun = false;
        // get css properties
        if (grabberTasks.grabCssProperties.state === false) {
            var cssProp = grabCssProperties(pageObj, settings.elementsMap);
            if (typeof(cssProp) == "object")
                innerLog("grabCssProperties: skips: " + cssProp.skips + "; processed: " + cssProp.processed, "info");
            else
                needTorerun = true;
        }

        // get rating starts colors
        if (grabberTasks.grabRatingStars.state === false) {
            var imgProp = grabRatingStars(pageObj);
            if (typeof(imgProp) == "object")
                innerLog("grabRatingStars: skips: " + imgProp.skips + "; processed: " + imgProp.processed, "info");
        }

        saveDataAndExit(pageObj);

        //
        if (needToRerun) {
            innerLog("threshold: " + rerunThreshold, "info");
            rerunThreshold--;
            if (rerunThreshold < 0) {
                innerLog("maximum re-runs were reached.", "error");
                phantom.exit();
            } else
                window.setInterval(function(){ onPageSuccess(pageObj); }, 5000);
            return;
        }

    }

    function getPageObject(clientName, displayCode, isApiHostname, productExternalID, testEnvironment, host, pageFormat) {
        var customPageUrl = "";
        if (displayCode === false)
            customPageUrl = clientName;
        return {
            scheme : "http",
            clientName: clientName,
            isApiHostname: isApiHostname,
            host : ( isApiHostname ? (clientName + ".ugc.bazaarvoice.com") : ( host || "reviews." + clientName + ".com") ),
            displayCode : displayCode,
            productExternalID : productExternalID,
            testEnvironment : testEnvironment,
            isValid: function () {
                if (this.isCustomLink())
                    return true;
                return (this.clientName !== "" && this.displayCode !== "" && this.productExternalID !== "");
            },
            isCustomLink: function() {
                return (this.customPageUrl !== "");
            },
            getUrl : function() {
                if (this.isCustomLink())
                    return this.customPageUrl;
                return this.scheme + "://" + this.host + (this.testEnvironment ? ("/" + this.testEnvironment) : "") + "/" + this.displayCode + "/" + this.productExternalID + "/reviews.htm?format=" + pageFormat;
            },
            getImageUrl : function (name) {
                name = name || "rating.gif";
                return "/" + this.displayCode + "/3_0/5/" + name;
            },
            webPageObject : false,
            customPageUrl : customPageUrl
        }
    }

    function grabRatingStars(pageObj) {
        innerLog("Start grabbing rating stars properties", "info");

        var imgPropsObj = pageObj.webPageObject.evaluate(function(colorToHexFn, isCustomLink, overallImage, secondaryImage) {
            var cRImg = document.createElement('canvas');
            var cRSImg = document.createElement('canvas');

            var imgRating = new Image();
            var imgRatingSecondary = new Image();

            var ratingImages = {};
            var _skips = 0;
            var _processed = 0
            
            
        
            if (isCustomLink) {
                var ratingStarOverallImg = document.querySelector('.BVRROverallRatingContainer .BVRRRatingNormalImage img');
                var ratingStarSecondaryImg = document.querySelector('.BVRRSecondaryRatingsContainer .BVRRRatingNormalImage img');
                if (ratingStarOverallImg != null)
                    imgRating.src = ratingStarOverallImg.getAttribute('src');
                if (ratingStarSecondaryImg != null)
                    imgRatingSecondary.src = ratingStarSecondaryImg.getAttribute('src');
            } else {
                imgRating.src = overallImage;
                imgRatingSecondary.src = secondaryImage;
            }

            console.log(imgRating.src);
            console.log("overall rating star image [with: " + imgRating.width + ", height: " + imgRating.height + "]");
            console.log(imgRatingSecondary.src);
            console.log("secondary rating star image [width: " + imgRatingSecondary.width + ", height: " + imgRatingSecondary.height + "]");

            // get colors from overall rating image
            if (imgRating.src !== "" && imgRating.width !== 0 && imgRating.height !== 0) {
                console.log("Using overall rating starts image ");
                var contextRatingImage = cRImg.getContext('2d');
                cRImg.setAttribute('id', 'myCanvasRating');
                cRImg.setAttribute('width', imgRating.width);
                cRImg.setAttribute('height', imgRating.height);
                document.body.appendChild(cRImg);
                contextRatingImage.drawImage(imgRating, 0, 0);
                var imgDataFilledR = contextRatingImage.getImageData(imgRating.width / 10, imgRating.height / 2, 1, 1);
                var imgDataUnfilledR = contextRatingImage.getImageData(imgRating.width - (imgRating.width / 10), imgRating.height / 2, 1, 1);
                ratingImages['overall'] = {
                    full: colorToHexFn("rgb(" + imgDataFilledR.data[0] + ", " + imgDataFilledR.data[1] + ", " + imgDataFilledR.data[2] + ")"),
                    empty: colorToHexFn("rgb(" + imgDataUnfilledR.data[0] + ", " + imgDataUnfilledR.data[1] + ", " + imgDataUnfilledR.data[2] + ")")
                };
                _processed++;
            } else
                _skips++;

            if (imgRatingSecondary.src !== "" && imgRatingSecondary.width !== 0 && imgRatingSecondary.height !== 0) {
                console.log("Using secondary rating starts image ");
                var contextRatingSecondaryImage = cRSImg.getContext('2d');
                cRSImg.setAttribute('id', 'myCanvasRatingSecondary');
                cRSImg.setAttribute('width', imgRatingSecondary.width);
                cRSImg.setAttribute('height', imgRatingSecondary.height);
                document.body.appendChild(cRSImg);
                contextRatingSecondaryImage.drawImage(imgRatingSecondary, 0, 0);
                var imgDataFilledRS = contextRatingSecondaryImage.getImageData(imgRatingSecondary.width / 10, imgRatingSecondary.height / 2, 1, 1);
                var imgDataUnfilledRS = contextRatingSecondaryImage.getImageData(imgRatingSecondary.width - (imgRatingSecondary.width / 10), imgRatingSecondary.height / 2, 1, 1);
                ratingImages['secondary'] = {
                    full: colorToHexFn("rgb(" + imgDataFilledRS.data[0] + ", " + imgDataFilledRS.data[1] + ", " + imgDataFilledRS.data[2] + ")"),
                    empty: colorToHexFn("rgb(" + imgDataUnfilledRS.data[0] + ", " + imgDataUnfilledRS.data[1] + ", " + imgDataUnfilledRS.data[2] + ")")
                };
                _processed++;
            } else
                _skips++;

            return {data : ratingImages, skips : _skips, processed : _processed};

        }, colorToHex, pageObj.isCustomLink(), pageObj.getImageUrl(), pageObj.getImageUrl('ratingSecondary.gif'));

        if (imgPropsObj.skips > 0 && imgPropsObj.processed == 0)
            return false;

        grabberTasks.grabRatingStars.state = true;
        grabberTasks.grabRatingStars.data = imgPropsObj;
        return imgPropsObj;
    }

    function grabCssProperties(pageObj, elMap) {
        // fetch css properties usign elementsMap
        innerLog("Start grabbing css properties", "info");
        //console.log(elMap);
        var cssPropsObj = pageObj.webPageObject.evaluate(function(colorToHexFn, elMap) {

            // is taken from http://haacked.com/archive/2009/12/29/convert-rgb-to-hex.aspx
            function colorToHex(color) {
                if (color.substr(0, 1) === '#') {
                    return color;
                }
                var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

                var red = parseInt(digits[2]);
                var green = parseInt(digits[3]);
                var blue = parseInt(digits[4]);

                var rgb = blue | (green << 8) | (red << 16);
                return digits[1] + '#' + rgb.toString(16);
            };

            /*
            !!! does not work with pahantomjs 1.7.0v
            var cl = document.createElement('link');
            cl.setAttribute('type', 'text/css');
            cl.setAttribute('href', 'http://pullups.ugc.bazaarvoice.com/static/4123-en_us/bazaarvoice.css');
            cl.setAttribute('rel', 'stylesheet');
            document.head.appendChild(cl);
            */

            // inner style container
            var _fetchedStyles = {};
            var _skips = 0;
            var _processed = 0;
            var _skippedItems = [];
            // loop by elemenets
            for(var elKey in elMap) {
                // current element alias
                var currElem = elMap[elKey];
                // get element
                var elem = document.querySelector(currElem.path);

                if (!!!elem) {
                    console.log("Could not access to element using path: " + currElem.path);
                    _skippedItems.push("Could not access to element using path: " + currElem.path);
                    _skips++;
                    continue;
                }

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
                        for (var j = 0; j < currElem.states.length; j++) {
                            var cssProp = window.getComputedStyle(elem, currElem.states[j]).getPropertyValue(currElem.cssProps[i]);
                            if (currElem.cssProps[i] === "color")
                                cssProp = colorToHex(cssProp);
                            _fetchedStyles[elKey][currElem.states[j]][currElem.cssProps[i]] = cssProp;
                            _processed++;
                        }
                    }
                    else {
                        var cssProp = window.getComputedStyle(elem, null).getPropertyValue(currElem.cssProps[i]);
                        if (currElem.cssProps[i] === "color")
                            cssProp = colorToHex(cssProp);
                        _fetchedStyles[elKey][currElem.cssProps[i]] = cssProp;
                        _processed++;
                    }
                }
            }
            return {data : _fetchedStyles, skips : _skips, processed : _processed, skippedItems : _skippedItems};
        }, colorToHex, elMap);

        if (cssPropsObj.skips > 0 && cssPropsObj.processed == 0)
            return false;

        grabberTasks.grabCssProperties.state = true;
        grabberTasks.grabCssProperties.data = cssPropsObj;
        return cssPropsObj;
    }

    /** Simple version of jQuery.extend(false, target, args..) since jQuery hasn't loaded yet. */
    function extend(target /*, args...*/) {
        var source, key, value, i;
        for (i = 1; i < arguments.length; i++) {
            if ((source = arguments[i]) != null) {
                for (key in source) {
                    if ((value = source[key]) !== undefined) {
                        target[key] = value;
                    }
                }
            }
        }
        return target;
    }

    function innerLog(msg, type) {
        console.log("["+type.toUpperCase()+"] " + new Date().toLocaleTimeString() + ": " + msg);
    }

    function saveDataAndExit (pageObj) {
        innerLog("Checking if all steps were done", "info");
        var isReadyToSave = true;
        for (var taskGroup in grabberTasks)
            isReadyToSave &= grabberTasks[taskGroup].state;
        // save all data
        if (isReadyToSave) {
            innerLog("Saving Data", "info");
            var allData = [];
            for (var taskGroup in grabberTasks)
                allData.push(grabberTasks[taskGroup].data.data);
            // print result
            innerLog("Results:", "info");
            innerLog("========================================", "info");
            innerLog(JSON.stringify(allData), "info");
            innerLog("========================================", "info");
            innerLog("Completed with:", "info");
            for (var taskGroup in grabberTasks) {
                innerLog("Task: @" + taskGroup + " [skips: " + grabberTasks[taskGroup].data.skips + "; processed: " + grabberTasks[taskGroup].data.processed + "]", "info");
                if (grabberTasks[taskGroup].data.skippedItems)
                    for (var i = 0; i < grabberTasks[taskGroup].data.skippedItems.length; i++)
                        innerLog("|- " + grabberTasks[taskGroup].data.skippedItems[i], "warn");
            }
            // save results
            var fs = require('fs');
            var f = false;
            var fileName = false;
            //innerLog(pageObj, "info");
            if (pageObj.isCustomLink())
                fileName = settingsPublic.resourceFolder + getHostName(pageObj.getUrl()) + ".json";
            else
                fileName = settingsPublic.resourceFolder + pageObj.clientName + ".json";
            f = fs.open(fileName, 'w');
            f.write(JSON.stringify(allData));
            f.close();
            innerLog("Data is saved into the file: " + fileName, "info");
            // exit
            phantom.exit();
        } else {
            innerLog("Not all tasks were completed:", "info");
            for (var taskGroup in grabberTasks)
                innerLog(taskGroup + " - " + (grabberTasks[taskGroup].state?"ok":"not ok"), "info");
        }
    }

    function getHostName (url) {
        // simple hostname parser
        return url.split('/')[2].replace(/\./g, '_');
    }

    function jsonToKeypathValue (jsonObject, runningKey) {
        var list = [];
        for (var key in jsonObject) {
            var currentKeypath = (runningKey ? (runningKey + "." + key) : key);
            console.log("running key is: " + currentKeypath);
            if (typeof(jsonObject[key]) === "object")
                list = list.concat(jsonToKeypathValue(jsonObject[key], currentKeypath));
            else {
                console.log("value reached: " + jsonObject[key]);
                list[currentKeypath] = jsonObject[key];
            }
        }
        console.log(list);
        return list;
    }

    // is taken from http://haacked.com/archive/2009/12/29/convert-rgb-to-hex.aspx
    function colorToHex(color) {
        console.log("colorToHex: translating "  + color + " to hex");

        if (color.substr(0, 1) === '#') {
            return color;
        }

        //pads left
        function lpad (str, padString, length) {
            while (str.length < length)
                str = padString + str;
            return str;
        }

        //pads right
        function rpad (str, padString, length) {
            while (str.length < length)
                str = str + padString;
            return str;
        }

        var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

        var red = parseInt(digits[2]);
        var green = parseInt(digits[3]);
        var blue = parseInt(digits[4]);

        var rgb = blue | (green << 8) | (red << 16);
        return digits[1] + '#' + lpad(rgb.toString(16), "0", 6);
    };

    // inject into window object
    w.bvStyleGrabber = bvSG;
})(window);


/******* TESTING SECTION ********/

var sys = require("system");
// 0 - script file itself
// 1 - clientName
// 2 - displayCode
// 3 - isApiHostname
// 4 - productExternalID
// 5 - testEnvironment
// 6 - host
if (sys.args.length == 2) {
    bvStyleGrabber.grabLink(sys.args[1]);
} else if (sys.args.length < 3) {
    console.log("Wrong argument count");
    phantom.exit();
} else
    bvStyleGrabber.grab(sys.args[1],sys.args[2],sys.args[3],sys.args[4],sys.args[5],sys.args[6]);