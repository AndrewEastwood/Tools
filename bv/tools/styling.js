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
        resourceFolder : "./data/styles/",
        //outputFmt : "",
        docID : ""
    };
    var documents = {
        elementsMap_bhive : {
            /* TODO: use elementsMap values to fill this json */
            ratingIcons : {
                summaryStars : {
                    subStyles : {
                        full : { color: '@images.OverallRating.full', size: '@images.OverallRating.size' },
                        empty : { color: '@images.OverallRating.empty', size: '@images.OverallRating.size' }
                    }
                },
                bars: {
                    subStyles : {
                        full : { color: '@images.SecondaryRating.full', size: '@images.SecondaryRating.size' },
                        empty : { color: '@images.SecondaryRating.empty', size: '@images.SecondaryRating.size' }
                    }
                },
                reviewStars: {
                    subStyles : {
                        full : { color: '@images.OverallRating.full', size: '@images.OverallRating.size' },
                        empty : { color: '@images.OverallRating.empty', size: '@images.OverallRating.size' }
                    }
                }
            },
            backgroundTab : {
                "section-header" : {color : "transparent"},
                "prs-container" : {color : "transparent"},
                "section-header-controls" : {color : "transparent"},
                button : {
                    color : "transparent",
                    subStyles: {
                        primary: { color: "#0B5681" },
                        hover: { color: "#0B5681" }
                    }
                },
                "content-summary": {color: "transparent" },
                "content-item": {color: "transparent" },
                "content-header": {color: "transparent" }
            },
            marginAndPadding: {
                "prs-container": {
                    margin: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 },
                    padding: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 }
                },
                "content-summary": {
                    margin: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 },
                    padding: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 }
                },
                "content-item": {
                    margin: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 },
                    padding: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 }
                },
                "content-header": {
                    margin: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 },
                    padding: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 }
                }
            },
            fonts: {
                body: {
                    lineHeight: 16.5,
                    sampleBackgroundColor: "white",
                    color: "#4B4B4B",
                    family: "Arial, sans-serif",
                    familyID: "sniffedFontFamily1637882686",
                    textTransform: "none",
                    characterStyles: [ ],
                    size: 12
                },
                button: {
                    lineHeight: 19.5,
                    sampleBackgroundColor: "black",
                    color: "#FFFFFF",
                    family: "Arial, Helvetica, sans-serif",
                    familyID: "fontFamily2",
                    textTransform: "none",
                    characterStyles: [ "bold" ],
                    subStyles: {
                        button: {
                            lineHeight: 16.5,
                            sampleBackgroundColor: "white",
                            color: "#FFF",
                            family: "Arial, sans-serif",
                            familyID: "sniffedFontFamily1637882686",
                            textTransform: "uppercase",
                            characterStyles: [ "bold" ],
                            size: 12
                        },
                        active: {
                            lineHeight: 16.5,
                            sampleBackgroundColor: "white",
                            color: "#FFF",
                            family: "Arial, sans-serif",
                            familyID: "sniffedFontFamily1637882686",
                            textTransform: "uppercase",
                            characterStyles: [ "bold" ],
                            size: 12
                        },
                        hover: {
                            lineHeight: 16.5,
                            sampleBackgroundColor: "white",
                            color: "#FFF",
                            family: "Arial, sans-serif",
                            familyID: "sniffedFontFamily1637882686",
                            textTransform: "uppercase",
                            characterStyles: [ "bold" ],
                            size: 12
                        }
                    },
                    size: 13
                },
                pageHeader: {
                    lineHeight: 16.5,
                    sampleBackgroundColor: "white",
                    color: "#4B4B4B",
                    family: "Arial, sans-serif",
                    familyID: "sniffedFontFamily1637882686",
                    textTransform: "none",
                    characterStyles: [ "bold" ],
                    size: 14
                },
                ugcDate: {
                    lineHeight: 16.5,
                    sampleBackgroundColor: "white",
                    color: "#4B4B4B",
                    family: "Arial, sans-serif",
                    familyID: "sniffedFontFamily1637882686",
                    textTransform: "none",
                    characterStyles: [ ],
                    size: 11
                },
                sectionHeader: {
                    lineHeight: 16.5,
                    sampleBackgroundColor: "white",
                    color: "#4B4B4B",
                    family: "Arial, sans-serif",
                    familyID: "sniffedFontFamily1637882686",
                    textTransform: "none",
                    characterStyles: [ "bold" ],
                    size: 12
                },
                link: {
                    lineHeight: 19.5,
                    family: "Arial, Helvetica, sans-serif",
                    familyID: "fontFamily2",
                    textTransform: "none",
                    characterStyles: [ ],
                    subStyles: {
                        visited: {
                            lineHeight: 16.5,
                            sampleBackgroundColor: "white",
                            color: "#2A5A97",
                            family: "Arial, sans-serif",
                            familyID: "sniffedFontFamily1637882686",
                            textTransform: "none",
                            characterStyles: [ ],
                            size: 12
                        },
                        link: {
                            lineHeight: 16.5,
                            sampleBackgroundColor: "white",
                            color: "#2A5A97",
                            family: "Arial, sans-serif",
                            familyID: "sniffedFontFamily1637882686",
                            textTransform: "none",
                            characterStyles: [ ],
                            size: 12
                        },
                        active: {
                            lineHeight: 16.5,
                            sampleBackgroundColor: "white",
                            color: "#2A5A97",
                            family: "Arial, sans-serif",
                            familyID: "sniffedFontFamily1637882686",
                            textTransform: "none",
                            characterStyles: [ ],
                            size: 12
                        },
                        hover: {
                            lineHeight: 16.5,
                            sampleBackgroundColor: "white",
                            color: "#2A5A97",
                            family: "Arial, sans-serif",
                            textTransform: "none",
                            characterStyles: [ ],
                            size: 12
                        }
                    },
                    size: 13
                },
                labels: {
                    lineHeight: 16.5,
                    sampleBackgroundColor: "white",
                    color: "#4B4B4B",
                    family: "Arial, sans-serif",
                    textTransform: "none",
                    characterStyles: [ ],
                    size: 12
                },
                dimensionValues: {
                    lineHeight: 16.5,
                    sampleBackgroundColor: "white",
                    color: "#4B4B4B",
                    family: "Arial, sans-serif",
                    textTransform: "none",
                    characterStyles: [ ],
                    size: 12
                },
                sectionHeaderControls: {
                    lineHeight: 16.5,
                    sampleBackgroundColor: "white",
                    color: "#4B4B4B",
                    family: "Arial, sans-serif",
                    textTransform: "none",
                    characterStyles: [ ],
                    size: 12
                },
                ugcName: {
                    lineHeight: 16.5,
                    sampleBackgroundColor: "white",
                    color: "#2A5A97",
                    family: "Arial, sans-serif",
                    textTransform: "none",
                    characterStyles: [ "bold" ],
                    size: 12
                }
            },
            borders: {
                "button-primary": {
                    bottomRightRadius: 3,
                    bottomLeftRadius: 3,
                    topRightRadius: 3,
                    bottom: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    left: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    right: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    topLeftRadius: 3,
                    radiiLocked: true,
                    top: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    }
                },
                "prs-container": {
                    bottomRightRadius: 0,
                    bottomLeftRadius: 0,
                    topRightRadius: 0,
                    bottom: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    left: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    right: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    topLeftRadius: 0,
                    radiiLocked: false,
                    top: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    }
                },
                "button-secondary": {
                    bottomRightRadius: 0,
                    bottomLeftRadius: 0,
                    topRightRadius: 0,
                    bottom: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    left: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    right: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    topLeftRadius: 0,
                    radiiLocked: false,
                    top: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    }
                },
                "content-summary": {
                    bottomRightRadius: 0,
                    bottomLeftRadius: 0,
                    topRightRadius: 0,
                    bottom: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    left: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    right: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    topLeftRadius: 0,
                    radiiLocked: false,
                    top: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    }
                },
                "content-item": {
                    bottomRightRadius: 0,
                    bottomLeftRadius: 0,
                    topRightRadius: 0,
                    bottom: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    left: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    right: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    topLeftRadius: 0,
                    radiiLocked: false,
                    top: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    }
                },
                "content-header": {
                    bottomRightRadius: 0,
                    bottomLeftRadius: 0,
                    topRightRadius: 0,
                    bottom: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    left: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    right: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    },
                    topLeftRadius: 0,
                    radiiLocked: false,
                    top: {
                        style: "none",
                        color: "transparent",
                        width: 0
                    }
                }
            }
        },
        elementsMap : {
            images : {
                'OverallRating' : { name : "rating.gif", path : '.BVRROverallRatingContainer .BVRRRatingNormalImage img' },
                'SecondaryRating' : { name : "ratingSecondary.gif", path : '.BVRRSecondaryRatingsContainer .BVRRRatingNormalImage img' }
            },
            text: {
                'ReviewTitles' : {
                    'path' : '.BVRRReviewTitle',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
                },
                'SectionHeader' : {
                    'path' : '.BVDITitle ',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
                },
                'SectionHeaderControls' : {
                    'path' : '#BVRRDisplayContentHeaderID ',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
                },
                'ReviewText' : {
                    'path' : '.BVRRReviewTextContainer',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
                },
                'ReviewDates' : {
                    'path' : '.BVRRReviewDate',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
                },
                'ReviewerName' : {
                    'path' : '.BVRRUserNickname',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
                },
                'Lables' : {
                    'path' : '.BVRRLabel',
                    'cssProps' : ['font-family', 'font-size', 'line-height', 'color', 'font-style', 'text-transform']
                },
                'DimensionValues' : {
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

        var kvArgs = {};

        if ((args.length - 1) % 2 !== 0) {
            innerLog("Wrong argument count passed: " + args.length, "error");
            return;
        }

        for (var i = 1; i < args.length; i+=2)
            kvArgs[args[i].substr(1)] = args[i + 1];

        //innerLog(kvArgs, "info");

        extend(settingsPublic, kvArgs);

        return this;
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
            var cssProp = grabCssProperties(pageObj, documents.elementsMap, "text");
            if (typeof(cssProp) == "object") {
                innerLog("grabCssProperties: skips: " + cssProp.log.skips + "; processed: " + cssProp.log.processed, "info");
                if (cssProp.log.processed == 0) isNeedToRerun = true;
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
                            if (currElem.cssProps[i] === "color")
                                cssProp = colorToHexFn(cssProp);
                            _fetchedStyles[elKey][currElem.states[j]][currElem.cssProps[i]] = cssProp;
                            _processed++;
                        }
                    }
                    else {
                        var cssProp = window.getComputedStyle(elem, null).getPropertyValue(currElem.cssProps[i]);
                        if (currElem.cssProps[i] === "color")
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
            saveIntoFile(fileName + ".json", JSON.stringify(allData));
            saveIntoFile(fileName + ".bhive", linkJsonValuesToBhiveDoc(allData, documents.elementsMap_bhive, "inline"));
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
        for (var key in bhiveListOfKeysValues)
            if (typeof(bhiveListOfKeysValues[key][0]) !== "undefined" &&
                bhiveListOfKeysValues[key][0] === '@' &&
                typeof(dataListOfKeysValues[bhiveListOfKeysValues[key].substr(1)]) !== "undefined") {
                innerLog("Modified: " + key + " : " + dataListOfKeysValues[bhiveListOfKeysValues[key].substr(1)], "info");
                bhiveListOfKeysValues[key] = dataListOfKeysValues[bhiveListOfKeysValues[key].substr(1)];
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
                    if (bhiveListOfKeysValues[key][0] == '[')
                        output += "data." + key + " = " + bhiveListOfKeysValues[key] + "; ";
                    else
                        output += "data." + key + " = '" + bhiveListOfKeysValues[key] + "'; ";
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

    function getHostName (url) {
        // simple hostname parser
        return url.split('/')[2].replace(/\./g, '_');
    }

    function jsonToKeypathValue (jsonObject, runningKey, list) {
        //var list = {};
        for (var key in jsonObject) {
            var currentKeypath = (runningKey ? (runningKey + "." + key) : key);
            //innerLog("jsonToKeypathValue: running key is: " + currentKeypath, "info");
            if (Array.isArray(jsonObject[key]))
                list[currentKeypath] = "['" + jsonObject[key].join(",'") + "']";
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