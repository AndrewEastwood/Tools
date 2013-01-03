(function (w) {

    var bvSG = {};
    var settingsPublic = {
        authUser: "",
        authPwd: "",
        clientName: "",
        host: "",
        displayCode: "",
        isApiHostname: true,
        productExternalID : "test1",
        testEnvironment : "bvstaging",
        pageFormat : "noscript",
        resourceFolder : phantom.libraryPath + "/../data/styles/",
        //outputFmt : "",
        docID : "",
        theme : 1,
        digest : ""
    };
    var documents = {
        elementsMap_bhive : {},
        elementsMap : {
            images : {
                'OverallRating' : { name : "rating.gif", path : '.BVRROverallRatingContainer .BVRRRatingNormalImage img' },
                'SecondaryRating' : { name : "ratingSecondary.gif", path : '.BVRRSecondaryRatingsContainer .BVRRRatingNormalImage img' }
            },
            text: {
                'RootElement' : {
                    'path' : '.BVRRRootElement',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                },
                'RatingSummary' : {
                    'path' : '.BVRRRatingSummary',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                },
                'ReviewTitles' : {
                    'path' : '.BVRRReviewTitle',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                },
                'SectionHeaderTitle' : {
                    'path' : '.BVRRDisplayContentTitle',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                },
                'SectionHeader' : {
                    'path' : '.BVRRDisplayContentHeader',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                },
                'SectionHeaderControls' : {
                    // 'path' : '.BVRRDisplayContentSubtitle', - is not available in the noscript format
                    'path' : '.BVRRSortAndSearch',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                },
                'ReviewText' : {
                    'path' : '.BVRRReviewTextContainer',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                },
                'ReviewContent' : {
                    'path' : "div[class^='BVRRReviewDisplayStyle'][class$='Content']",
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                },
                'ReviewItem' : {
                    'path' : '.BVRRContentReview',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                },
                'ReviewDates' : {
                    'path' : '.BVRRReviewDate',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                },
                'ReviewerName' : {
                    'path' : '.BVRRUserNickname',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                },
                'Lables' : {
                    'path' : '.BVRRLabel',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                },
                'DimensionValues' : {
                    'path' : '.BVRRRatingNormalOutOf',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                },
                'Links' : {
                    'path' : '.BVRRRootElement a',
                    'states' : ['link', 'hover', 'active', 'visited'],
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                },
                'Buttons' : {
                    'path' : '.BVRRDisplayContentLinkWrite a',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform', 'background-color', 'font-weight']
                }
            },
            borders : {
                'RatingSummary' : {
                    'path' : '.BVRRRatingSummary',
                    'cssProps' : ['border-left-style', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-color', 'border-top-color', 'border-right-color', 'border-bottom-color']
                },
                'ContentItem' : {
                    'path' : ".BVRRContentReview div[class^='BVRRReviewDisplayStyle']",
                    'cssProps' : ['border-left-style', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-color', 'border-top-color', 'border-right-color', 'border-bottom-color']
                },
                'ContentHeader' : {
                    'path' : '.BVRRReviewTitleContainer',
                    'cssProps' : ['border-left-style', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-color', 'border-top-color', 'border-right-color', 'border-bottom-color']
                },
                'ContentSummary' : {
                    'path' : "div[class^='BVRRReviewDisplayStyle'][class$='Content']",
                    'cssProps' : ['border-left-style', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-color', 'border-top-color', 'border-right-color', 'border-bottom-color']
                },
                'PrimaryButton' : {
                    'path' : '.BVRRDisplayContentLinkWrite a',
                    'cssProps' : ['border-left-style', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-color', 'border-top-color', 'border-right-color', 'border-bottom-color']
                },
                'SecondaryButton' : {
                    'path' : '.BVRRDisplayContentLinkWrite a',
                    'cssProps' : ['border-left-style', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-color', 'border-top-color', 'border-right-color', 'border-bottom-color']
                }
            },
            marginAndPadding : {
                'RatingSummary' : {
                    'path' : '.BVRRRatingSummary',
                    'cssProps' : ['margin-left', 'margin-top', 'margin-right', 'margin-bottom', 'padding-left', 'padding-top', 'padding-right', 'padding-bottom']
                },
                'ContentItem' : {
                    'path' : ".BVRRContentReview div[class^='BVRRReviewDisplayStyle']",
                    'cssProps' : ['margin-left', 'margin-top', 'margin-right', 'margin-bottom', 'padding-left', 'padding-top', 'padding-right', 'padding-bottom']
                },
                'ContentHeader' : {
                    'path' : '.BVRRReviewTitleContainer',
                    'cssProps' : ['margin-left', 'margin-top', 'margin-right', 'margin-bottom', 'padding-left', 'padding-top', 'padding-right', 'padding-bottom']
                },
                'ContentSummary' : {
                    'path' : "div[class^='BVRRReviewDisplayStyle'][class$='Content']",
                    'cssProps' : ['margin-left', 'margin-top', 'margin-right', 'margin-bottom', 'padding-left', 'padding-top', 'padding-right', 'padding-bottom']
                }
            }
        }
    };

    var grabberTasks = {
        grabCssProperties : {
            state: false,
            data : {},
            log : false
        },
        grabRatingStars : {
            state: false,
            data: {},
            log : false
        }
    };
    var rerunThreshold = 3;
    var isSavingData = false;
    var isNeedToRerun = false;
    var logCache = "";

    /********* PUBLIC METHODS *********/

    bvSG.setupWithArguments = function (args) {

        innerLog('Setup', 'info');

        var kvArgs = {};

        if ((args.length - 1) % 2 !== 0) {
            innerLog("Wrong argument count passed: " + args.length, "error");
            return;
        }

        for (var i = 1; i < args.length; i+=2)
            kvArgs[args[i].substr(1)] = args[i + 1];

        //innerLog(kvArgs.digest, "info");

        extend(settingsPublic, kvArgs);

        //innerLog("Data Passed With Digest Variable: ", "info");
        //innerLog(settingsPublic.digest, "info");
        //innerLog("--------------------------------------", "info");

        if (settingsPublic.digest.length != 0 && settingsPublic.clientName.length == 0)
            updateSettingsWithDigest();

        innerLog("Using theme file : " + (settingsPublic.theme || 1), "info");
        documents.elementsMap_bhive = loadDocument(phantom.libraryPath + "/../docs/customerBhiveTheme" + (settingsPublic.theme || 1) + ".js");

        return this;
    }

    function updateSettingsWithDigest() {
        var lines = settingsPublic.digest.split('\n');
        var map = {};
        for (var i = 0; i < lines.length; i++) {
            //innerLog("Digest Variable Is = " + lines[i], "info");
            var kv = /^(.*):(.*)$/.exec(lines[i]);
            //innerLog(kv, "info");
            if (kv)
                map[kv[1].replace(/ /g, '')] = kv[2].trim();
        }

        settingsPublic.digest = map;

        // update settings
        settingsPublic.displayCode = map.DisplayCode;
        settingsPublic.clientName = map.ClientName;
        if (!!map.APIHostname)
            settingsPublic.host = map.APIHostname;
        else
            settingsPublic.host = map.BVHostname;
        //innerLog("Display Code = " + map.DisplayCode, "info");
    }
    
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

    bvSG.grab = function (clientName, displayCode, isApiHostname, productExternalID, testEnvironment, host, updatedocuments) {

        // update documents
        if (updatedocuments) {
            if (!!clientName)
                settingsPublic.clientName = clientName;
            if (!!displayCode)
                settingsPublic.displayCode = displayCode;
            if (!!isApiHostname)
                settingsPublic.isApiHostname = !!isApiHostname;
            if (!!productExternalID)
                settingsPublic.productExternalID = productExternalID;
            if (!!testEnvironment)
                settingsPublic.testEnvironment = testEnvironment;
            if (!!host)
                settingsPublic.host = host;
        }

        var pageObj = getPageObject(
                clientName || settingsPublic.clientName,
                displayCode || settingsPublic.displayCode,
                !!(isApiHostname || settingsPublic.isApiHostname),
                productExternalID || settingsPublic.productExternalID,
                testEnvironment || settingsPublic.testEnvironment,
                host || settingsPublic.host,
                settingsPublic.pageFormat);

        innerLog("--- client name: " + pageObj.clientName, "info");
        innerLog("--- host name: " + pageObj.host, "info");
        innerLog("--- display code: " + pageObj.displayCode, "info");
        innerLog("--- using api host name: " + ((pageObj.isApiHostname)? "yes" : "no"), "info");
        innerLog("--- test environment : " + pageObj.testEnvironment, "info");
        innerLog("--- product external id : " + pageObj.productExternalID, "info");
        innerLog("--- implementation id : " + settingsPublic.docID, "info");

        if (pageObj.isValid()) {
            innerLog("Working with: " + pageObj.getUrl(), "info");
            grabber(pageObj); 
        }
    };

    /********* INTERNAL METHODS *********/

    function loadDocument (pathToDocument) {
        var fs = require('fs');
        if (fs.exists(pathToDocument)) {
            var rawJson = fs.read(pathToDocument);
            innerLog("--- received data: " + pathToDocument + " : length = " + rawJson.length, "info");
            if (rawJson)
                return eval('(' + rawJson + ')');
        } else
            innerLog("failed to load document: " + pathToDocument, "error");

        return {};
    }

    function grabber(pageObj) {
        // create web page
        pageObj.webPageObject = require('webpage').create();
        // setup event handlers
        pageObj.webPageObject.onConsoleMessage = function (msg){
            innerLog(msg, "info");
        };
        // use auth documents
        if (settingsPublic.authUser) {
            innerLog("Auth is required. Using user login to connect: " + settingsPublic.authUser, "info");
            page.documents.userName = settingsPublic.authUser;
        }
        if (settingsPublic.authPwd) {
            page.documents.password = settingsPublic.authPwd;
        }
        // start
        pageObj.webPageObject.open(pageObj.getUrl(), function(status) {
            innerLog("Status received = " + status, status);
            if (status == "success") { 
                //window.setInterval(function(){ onPageSuccess(pageObj); }, 5000);
                onPageSuccess(pageObj);
            } else {
                innerLog("Unable to fetch data from the url", "error");
                phantom.exit();
            }
        });
    }

    function onPageSuccess(pageObj) {
        innerLog("Event Triggered: onPageSuccess", "info");
        // get css properties
        if (grabberTasks.grabCssProperties.state === false) {
            var cssPropTxt = grabCssProperties(pageObj, documents.elementsMap, "text");
            if (typeof(cssPropTxt) == "object") {
                innerLog("grabCssProperties: text properties skips: " + cssPropTxt.log.skips + "; processed: " + cssPropTxt.log.processed, "info");
                if (cssPropTxt.log.processed == 0) isNeedToRerun = true;
            } else
                isNeedToRerun = true;

            var cssPropBrd = grabCssProperties(pageObj, documents.elementsMap, "borders");
            if (typeof(cssPropBrd) == "object") {
                innerLog("grabCssProperties: border properties skips: " + cssPropBrd.log.skips + "; processed: " + cssPropBrd.log.processed, "info");
                if (cssPropBrd.log.processed == 0) isNeedToRerun = true;
            } else
                isNeedToRerun = true;

            var cssPropMP = grabCssProperties(pageObj, documents.elementsMap, "marginAndPadding");
            if (typeof(cssPropMP) == "object") {
                innerLog("grabCssProperties: margins and paddings properties skips: " + cssPropMP.log.skips + "; processed: " + cssPropMP.log.processed, "info");
                if (cssPropMP.log.processed == 0) isNeedToRerun = true;
            } else
                isNeedToRerun = true;
        }

        // get rating stars colors
        if (grabberTasks.grabRatingStars.state === false) {
            var imgProp = grabRatingStars(pageObj, documents.elementsMap, "images");
            if (typeof(imgProp) == "object") {
                innerLog("grabRatingStars: skips: " + imgProp.log.skips + "; processed: " + imgProp.log.processed, "info");
                if (imgProp.log.processed == 0) isNeedToRerun = true;
            } else
                isNeedToRerun = true;
        }

        saveDataAndExit(pageObj);
        //
        if (isNeedToRerun && !isSavingData) {
            innerLog("Need to re-run : " + (isNeedToRerun?"yes":"no"), "demo");
            innerLog("Thresholds left: " + rerunThreshold, "info");
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
                return this.scheme + "://" + this.host  + (this.testEnvironment ? ("/" + this.testEnvironment) : "") + "/" + this.displayCode + "/" + this.productExternalID + "/reviews.htm?format=" + pageFormat;
            },
            getImageUrl : function (name) {
                name = name || "rating.gif";
                return (this.testEnvironment ? ("/" + this.testEnvironment) : "") + "/" + this.displayCode + "/3_0/5/" + name;
            },
            webPageObject : false,
            customPageUrl : customPageUrl
        }
    }

    function grabRatingStars(pageObj, elMap, elementsKey) {
        innerLog("Start grabbing rating stars properties", "info");

        var imgsToGrab = {};
        for (var imgId in elMap[elementsKey]) {
            if (pageObj.isCustomLink())
                imgsToGrab[imgId] = { path : elMap[elementsKey][imgId].path, isCustom : true }
            else
                imgsToGrab[imgId] = { url : pageObj.getImageUrl(elMap[elementsKey][imgId].name), isCustom : false }
        }

        var imgPropsObj = pageObj.webPageObject.evaluate(function(colorToHexFn, imgsToGrab, isCustomLink, overallImage, secondaryImage) {

            var _skips = 0;
            var _processed = 0;
            var ratingImages = {};

            // run over provided images
            for (var imgItemKey in imgsToGrab) {

                console.log(imgsToGrab[imgItemKey].isCustom?imgsToGrab[imgItemKey].path:imgsToGrab[imgItemKey].url);

                var canvas = document.createElement('canvas');
                var imgContext = canvas.getContext('2d');
                var imgRating = new Image();

                if (imgsToGrab[imgItemKey].isCustom) {
                    //console.log("Using custom page url with path to image: " + imgsToGrab[imgItemKey].path);
                    var imageHtmlElement = document.querySelector(imgsToGrab[imgItemKey].path);
                    if (imageHtmlElement != null)
                        imgRating.src = imageHtmlElement.getAttribute('src');
                } else {
                    //console.log("Using standart page with url to image: " + imgsToGrab[imgItemKey].url);
                    imgRating.src = imgsToGrab[imgItemKey].url;
                }

                console.log("Using " + imgItemKey + " image");
                console.log("Image url: " + imgRating.src);
                console.log("Image dimensions [with: " + imgRating.width + ", height: " + imgRating.height + "]");

                // get colors from overall rating image
                if (imgRating.src !== "" && imgRating.width !== 0 && imgRating.height !== 0) {
                    console.log("Setting with attribute");
                    canvas.setAttribute('width', imgRating.width);
                    console.log("Setting height attribute");
                    canvas.setAttribute('height', imgRating.height);
                    console.log("Appending image into the document body");
                    document.body.appendChild(canvas);
                    console.log("Drawing rating stars image");
                    imgContext.drawImage(imgRating, 0, 0);
                    var imgDataFull = imgContext.getImageData(imgRating.width / 10, imgRating.height / 2, 1, 1);
                    var imgDataEmpty = imgContext.getImageData(imgRating.width - (imgRating.width / 10), imgRating.height / 2, 1, 1);
                    ratingImages[imgItemKey] = {
                        full: colorToHexFn("rgb(" + imgDataFull.data[0] + ", " + imgDataFull.data[1] + ", " + imgDataFull.data[2] + ")"),
                        empty: colorToHexFn("rgb(" + imgDataEmpty.data[0] + ", " + imgDataEmpty.data[1] + ", " + imgDataEmpty.data[2] + ")"),
                        size: imgRating.height
                    };
                    _processed++;
                } else
                    _skips++;
            }

            return {data : ratingImages, log : {skips : _skips, processed : _processed}};
        }, colorToHex, imgsToGrab);

        if (imgPropsObj.log.skips > 0 && imgPropsObj.log.processed == 0)
            return false;

        grabberTasks.grabRatingStars.state = true;
        grabberTasks.grabRatingStars.log = imgPropsObj.log;
        grabberTasks.grabRatingStars.data[elementsKey] = imgPropsObj.data;

        //console.log(JSON.stringify(grabberTasks.grabRatingStars.data));

        return imgPropsObj;
    }

    function grabCssProperties(pageObj, elMap, elementsKey) {
        // fetch css properties usign elementsMap
        innerLog("Start grabbing css properties", "info");



        //console.log(elMap);
        var cssPropsObj = pageObj.webPageObject.evaluate(function(colorToHexFn, elMap) {

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
            // loop by elements
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
                            if (currElem.cssProps[i] === "color" || (currElem.cssProps[i].indexOf('color') >= 0 && cssProp.indexOf('rgb') == '0'))
                                cssProp = colorToHexFn(cssProp);
                            _fetchedStyles[elKey][currElem.states[j]][currElem.cssProps[i]] = cssProp;
                            _processed++;
                        }
                    }
                    else {
                        var cssProp = window.getComputedStyle(elem, null).getPropertyValue(currElem.cssProps[i]);
                        if (currElem.cssProps[i] === "color" || (currElem.cssProps[i].indexOf('color') >= 0 && cssProp.indexOf('rgb') == '0'))
                            cssProp = colorToHexFn(cssProp);
                        _fetchedStyles[elKey][currElem.cssProps[i]] = cssProp;
                        _processed++;
                    }
                }
            }
            return {data : _fetchedStyles, log : {skips : _skips, processed : _processed, skippedItems : _skippedItems}};
        }, colorToHex, elMap[elementsKey]);

        if (cssPropsObj.log.skips > 0 && cssPropsObj.log.processed == 0)
            return false;
        grabberTasks.grabCssProperties.state = true;
        grabberTasks.grabCssProperties.log = cssPropsObj.log;
        grabberTasks.grabCssProperties.data[elementsKey] = cssPropsObj.data;
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
        var sign = " "
        // show short signs with messages
        if (type === 'warn') sign = "!";
        if (type === 'error') sign = "*";
        if (type === 'fail') sign = "X";
        // log message
        var message = "["+type.toUpperCase()+"] " + new Date().toLocaleTimeString() + " " + sign + " : " + msg;
        console.log(message);
        // will be stored into the file
        logCache += "\n" + message;
    }

    function saveDataAndExit (pageObj) {
        if (isSavingData)
            return;
        isSavingData = true;

        innerLog("Checking if all steps were done", "info");
        var isReadyToSave = true;
        for (var taskGroup in grabberTasks)
            isReadyToSave &= grabberTasks[taskGroup].state;
        // save all data
        if (isReadyToSave) {
            innerLog("Saving Data", "info");
            var allData = {};
            for (var taskGroup in grabberTasks)
                for (var dataKey in grabberTasks[taskGroup].data)
                    allData[dataKey] = grabberTasks[taskGroup].data[dataKey];
            // print result
            innerLog("Results:", "info");
            innerLog("========================================", "info");
            innerLog("\n" + JSON.stringify(allData), "info");
            innerLog("========================================", "info");
            innerLog("Completed with:", "info");
            for (var taskGroup in grabberTasks) {
                innerLog("Task: @" + taskGroup + " [skips: " + grabberTasks[taskGroup].log.skips + "; processed: " + grabberTasks[taskGroup].log.processed + "]", "info");
                if (grabberTasks[taskGroup].log.skippedItems)
                    for (var i = 0; i < grabberTasks[taskGroup].log.skippedItems.length; i++)
                        innerLog("   " + grabberTasks[taskGroup].log.skippedItems[i], "warn");
            }
            // save results
            if (pageObj.isCustomLink())
                fileName = settingsPublic.resourceFolder + getHostName(pageObj.getUrl());
            else
                fileName = settingsPublic.resourceFolder + pageObj.clientName;
            //saveIntoFile(fileName + ".json", JSON.stringify(allData));
            //saveIntoFile(fileName + ".bhive", linkJsonValuesToBhiveDoc(allData, documents.elementsMap_bhive, "inline"));
            saveIntoFile(fileName + ".update", linkJsonValuesToBhiveDoc(allData, documents.elementsMap_bhive, "update"));
            saveIntoFile(fileName + ".log", logCache);
            // exit
            phantom.exit();
        } else {
            innerLog("Not all tasks were completed:", "info");
            for (var taskGroup in grabberTasks)
                innerLog(taskGroup + " - " + (grabberTasks[taskGroup].state?"ok":"not ok"), (grabberTasks[taskGroup].state?"info":"warn"));
            isSavingData = false;
        }
    }

    function saveIntoFile(fileName, data) {

        if (data == "")
            return;

        var fs = require('fs');
        var f = false;
        f = fs.open(fileName, 'w');
        f.write(data);
        f.close();
        innerLog("Data is saved into the file: " + fileName, "info");
    }

    function linkJsonValuesToBhiveDoc(jsonData, bhiveDoc, format) {

        // get list of key : value
        //innerLog("Transforming bhive structure into key:value strings", "info");
        //innerLog("Transforming fetched data structure into key:value strings", "info");
        var bhiveListOfKeysValues = {};
        var dataListOfKeysValues = {};
        jsonToKeypathValue(bhiveDoc, false, bhiveListOfKeysValues);
        jsonToKeypathValue(jsonData, false, dataListOfKeysValues);

        //console.log("BHIVE LIST : ");
        //console.log(bhiveListOfKeysValues);
        //console.log("JSON LIST : ");
        //console.log(dataListOfKeysValues);

        // update bhive document values
        var _tmpVal = false;
        for (var key in bhiveListOfKeysValues)
            if (Array.isArray(bhiveListOfKeysValues[key])) {
                var _arr = [];
                for (var i = 0; i < bhiveListOfKeysValues[key].length; i++)
                    if (bhiveListOfKeysValues[key][i][0] === '@') {
                        //_tmpVal = dataListOfKeysValues[bhiveListOfKeysValues[key][i].substr(1)];
                        _tmpVal = getValueByKey(bhiveListOfKeysValues[key][i], dataListOfKeysValues);
                        if (typeof(_tmpVal) === "undefined" || _tmpVal == "none" || _tmpVal == "normal" || _arr.indexOf(_tmpVal) >= 0)
                            continue;
                        else
                            _arr.push(_tmpVal);
                    }
                    else
                        _arr.push(bhiveListOfKeysValues[key][i]);
                bhiveListOfKeysValues[key] = _arr;//'[' + _arr.join(',') + ']';
            }
            else if (typeof(bhiveListOfKeysValues[key]) === "string" && bhiveListOfKeysValues[key][0] === '@') {
                _tmpVal = getValueByKey(bhiveListOfKeysValues[key], dataListOfKeysValues);
                if (typeof(_tmpVal) !== "undefined") {
                    bhiveListOfKeysValues[key] = _tmpVal;
                    innerLog("Modified: " + key + " : " + _tmpVal, "info");
                }
            }
        

        var output = false;
        switch (format) {
            case "inline" : {
                output = "";
                for (var key in bhiveListOfKeysValues)
                    output += "modifyImplementation.sh " + settingsPublic.docID + " " + key + " " + bhiveListOfKeysValues[key] + "\n";
                break;
            }
            case "update" : {
                output = "";
                for (var key in bhiveListOfKeysValues)
                    output += "data." + getCompatibleUnderscoreDocumentKey(key) + " = " + convertValueToNativeType(bhiveListOfKeysValues[key], false, key, bhiveListOfKeysValues) + "; ";
                break;
            }
            case "raw" : {
                output = bhiveListOfKeysValues;
                break;
            }
            case "json" :
            default : {
                output = JSON.stringify(bhiveListOfKeysValues);
            }
        }
        // return updated document
        return output;
    }

    function convertValueToNativeType (value, inArray, valueKey, keyValMap) {

        if (typeof(value) === "undefined")
            return value;

        if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i++)
                value[i] = convertValueToNativeType(value[i], true);
            return '[' + value.join(',') + ']';
        }

        //
        var propLineHeight = /^(.*)(lineHeight)$/.exec(valueKey);
        if (propLineHeight && !stringIsNumber(value)) {
            innerLog('Replacing line-height value by ' + propLineHeight[1] + 'size', "info");
            value = keyValMap[propLineHeight[1] + 'size'];
        }

        if (stringIsNumber(value))
            return value;

        if (inArray)
            return '\"' + value + '\"';

        innerLog("Running value = " + value + "; type = " + typeof(value), "info");
        if (typeof(value) === "boolean" || (value.toLowerCase() == "false" || value.toLowerCase() == "true"))
            return value;

        return '"' + value + '"';
    }

    function getValueByKey(key, data, defValue) {
        
        if (key.indexOf('|') >= 0) {
            var keys = key.split('|');
            var _tmpVal = false;
            for (var i in keys)
                if (typeof(keys[i]) !== "undefined") {
                    if (typeof(keys[i]) === "string" && keys[i][0] === '@') {
                        _tmpVal = getValueByKey(keys[i].substr(1), data);
                        if (typeof(_tmpVal) !== "undefined")
                            return _tmpVal;
                    }
                    else {
                        // some value that is not a key
                        // maybe some default value
                        return keys[i];
                    }
                }
            return getValueByKey("@none", data, "PLEASE CHECK THIS LINE!!! PROVIDE DEFAULT VALUE");
        }

        var ret = data[key.substr(1)] || defValue;
        innerLog('Return value is: ' + ret + " typeof = " + typeof(ret), "info");
        if (typeof(ret) === "string") {
            ret = ret.replace(/\'/g,"");
            // remove 'px' from 16px ==> will be '16' 
            var pxNum = /^(\d+)(px)$/.exec(ret.toLowerCase());
            if (pxNum != null && pxNum.length == 3 && pxNum[2] == "px" && pxNum[1] != "")
                ret = parseInt(pxNum[1]);
        }

        return ret;
    }

    function getCompatibleUnderscoreDocumentKey (key) {
        // detect special chars
        var newKey = "";
        if (key.indexOf('-') >= 0) {
            var chains = key.split('.');
            for (var i = 0; i < chains.length; i++)
                if (chains[i].indexOf('-') == -1)
                    newKey += ((newKey.length ? '.' : '') + chains[i]);
                else
                    newKey += "['" + chains[i] + "']";
        } else
            return key;

        return newKey;
    }

    function getHostName (url) {
        // simple hostname parser
        return url.split('/')[2].replace(/\./g, '_');
    }

    function getDigestValue () {

    }

    function jsonToKeypathValue (jsonObject, runningKey, list) {
        //var list = {};
        for (var key in jsonObject) {
            var currentKeypath = (runningKey ? (runningKey + "." + key) : key);
            //innerLog("jsonToKeypathValue: running key is: " + currentKeypath, "info");
            if (Array.isArray(jsonObject[key])) {
                innerLog('jsonToKeypathValue: array value detected with key: ' + key, 'info');
                /*ar _valueArr = [];
                for (var i = 0; i < jsonObject[key].length; i++) {
                    if (jsonObject[key][i][0] = '@')
                        _valueArr.push(jsonObject[key][i]); 
                    else
                        _valueArr.push("'" + jsonObject[key][i] + "'"); 
                };
                list[currentKeypath] = _valueArr;//"[" + _valueArr.join(",") + "]";
                */
                list[currentKeypath] = jsonObject[key];
            }
            else if (typeof(jsonObject[key]) === "object")
                jsonToKeypathValue(jsonObject[key], currentKeypath, list);
            else {
                //innerLog("jsonToKeypathValue: value reached: " + jsonObject[key], "info");
                list[currentKeypath] = jsonObject[key];
                //innerLog("jsonToKeypathValue: [" + currentKeypath + " : " + jsonObject[key] + "]", "info");
            }
        }
        //console.log(list);
        return list;
    }

    function stringIsNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // is taken from http://haacked.com/archive/2009/12/29/convert-rgb-to-hex.aspx
    function colorToHex(color) {

        var retColor = color.toUpperCase();

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

        var digitsString = /(.*?)(rgb|rgba)\((.*)\)/.exec(color);

        var digits = digitsString[3].split(',')

        var red = parseInt(digits[0]);
        var green = parseInt(digits[1]);
        var blue = parseInt(digits[2]);

        if (digits.length == 4 && typeof(digits[3]) !== "undefined" && parseInt(digits[3]) === 0)
            retColor = "transparent";
        else {
            var rgb = blue | (green << 8) | (red << 16);
            retColor = '#' + lpad(rgb.toString(16), "0", 6).toUpperCase();
        }


        console.log("colorToHex: translating "  + color + " to hex >> " + retColor);
        return retColor;
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
    if (sys.args[1] == '?' || sys.args[1] == 'help') {
        console.log('Style Grabber Usage:');
        console.log('');
        console.log('pass arguments with th following format: -<property> <value>');
        console.log('');
        console.log('available properties:');
        console.log('===============================');
        console.log('');
        console.log('clientName');
        console.log('docID');
        console.log('authUser');
        console.log('authPwd');
        console.log('displayCode');
        console.log('host');
        console.log('isApiHostname       - true | false (default is true)');
        console.log('productExternalID   - product id with reviews (default is test1)');
        console.log('testEnvironment     - [<empty> | <bvstaging>] (default is bvstaging)');
        console.log('pageFormat          -');
        console.log('resourceFolder      -');
        console.log('');
        console.log('example:');
        console.log('');
        console.log('-clientName demo -displayCode 0001');
        console.log('');
        console.log('===============================');
        console.log('To run this script itself run: phantomjs styling.js [arguments]');
        console.log('');

        phantom.exit();
    } else
        bvStyleGrabber.grabLink(sys.args[1]);
}
if (sys.args.length < 3) {
    //console.log("Wrong argument count");
    phantom.exit();
} else 
    bvStyleGrabber.setupWithArguments(sys.args).grab();