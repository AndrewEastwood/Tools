var cursor = db.clients.find({}, {_id:0});
var itemsToSkip = 0;
var itemsToPrint = 10;
var clients = [];

//print("[")
while(cursor.hasNext() && itemsToPrint > 0){

    if (itemsToSkip > 0) {
        cursor.next();
        itemsToSkip--;
        continue;
    }


    //var j = cursor.next();
	//print(j.name);
    //var json = printjson();

    clients.push(cursor.next());

    //if (cursor.hasNext())
    //print(",");
    itemsToPrint--;
}
//print("]");

exportToCSV(getCSVFields(), getClientsInfo(clients));

//for (var i = 0; i < clients.length; i++)
	//print(clients[i].name);


function getClientsInfo(jsonDataArray) {

    //console.log(jsonDataArray);

    //print("getClientsInfo");

    var jiraClientsJson = {};
    for (var key in jsonDataArray) {
        //if (jsonDataArray[key].name != "" && jsonDataArray[key].uiVersion != "") {
            jiraClientsJson[jsonDataArray[key].name] = new clientDataObject(jsonDataArray[key], jiraClientsJson);
        //}
    }

    return jiraClientsJson;
}

function clientDataObject(rawData, allRawData) {
    //print("clientDataObject");
    
    this.getBundleName = function () { 
        return rawData.bundle;
    }
    this.getDirectoryName = function () { 
        return rawData.directory;
    }
    this.getName = function () { 
        return rawData.name;
    }
    this.getIGLink = function (path, linkTitle) {
        if (typeof(linkTitle) == "undefined" || linkTitle == "")
            return "https://ig.bazaarvoice.com/xref/customers-trunk/" + path;
        return "[" + linkTitle + "|" + this.getIGLink(path) + "]";
    }
    this.keyValueString = function (k, v) {
        return " *" + k + "*: (" + v + ") ";
    }
    this.getJiraDescription = function (escape) {
        // generate table style description for jira

        var desc = {};

        desc["UI Version"] = this.getUIversion(this.getDirectoryName());
        desc.directory = this.getIGLink(this.getDirectoryName(), this.getDirectoryName());
        
        if (typeof(rawData.bundleFolders) !== "undefined") {
            desc["bundle folders"] = [];
            for (var idx in rawData.bundleFolders)
                desc["bundle folders"].push(this.getIGLink(rawData.bundleFolders[idx], rawData.bundleFolders[idx]));
        }

        if (typeof(rawData.authentication) !== "undefined") {
	        desc["authentication"] = [];
	        for (var idx in rawData.authentication.map)
	            for (var dc in rawData.authentication.map[idx])
	                desc["authentication"].push(this.keyValueString(dc, rawData.authentication.map[idx][dc]));
        }

        if (typeof(rawData.hosted) !== "undefined") {
            desc["display codes"] = [];
            if (typeof(rawData.hosted.displayCodes) !== "undefined")
                for (var dcName in rawData.hosted.displayCodes)
                    desc["display codes"].push(this.getIGLink(this.getDirectoryName() + '/displays/' + dcName, dcName));
            if (typeof(rawData.hosted.locales) !== "undefined")
                desc["locales"] = rawData.hosted.locales;
            if (typeof(rawData.hosted.products) !== "undefined")
                desc["other products"] = rawData.hosted.products;
        }

        
        if (typeof(rawData.feeds) !== "undefined") {
            for (var feedType in rawData.feeds) {
                desc["feed " + feedType] = [];
                for (var feedCat in rawData.feeds[feedType]) {
                    var category = [];
                    for (var feedIdx in rawData.feeds[feedType][feedCat])
                        if (feedCat == "scheduled")
                            category.push(rawData.feeds[feedType][feedCat][feedIdx]);
                        else
                            category.push(feedIdx + "=" + rawData.feeds[feedType][feedCat][feedIdx]);
                    desc["feed " + feedType].push(this.keyValueString(feedCat, category.join('; ')));
                }
            }
        }
        /*desc += "|display(s)|" + "";
        desc += "|submission|" + "";
        desc += "|display codes|" + "";

        desc += "|esp|" + "";
        desc += "|export feeds|" + "";
        desc += "|product feed|" + "";
        desc += "|overrides|" + "";
    */

        var stringDesc = "";
        var value = "";

        for (var p in desc) {
            if (Array.isArray(desc[p]))
                value = desc[p].join(' \\\\ ');
            else
                value = desc[p];
            value = value || "undefined";
            stringDesc += "|" + p + "|" + (escape?value.replace(/\,/g,"\\,").replace(/\"/g, '\\"'):value) + "| ";
        }

        return stringDesc;
    }
    this.getPhase = function() {
        return rawData.phase;
    }
    this.getUIversion = function (clientDirName) {
        return this.getIGLink(clientDirName + "/config/bundleConfiguration.xml", rawData.uiVersion || "unable to identify");
    }
    this.toString = function () {
        var str = "";
        str += 'Story,';
        str += '"Upgrade ' + this.getName() + '",';
        str += '"' + this.getJiraDescription(true) + '",';
        str += '"' + "Unscheduled - Phase " + this.getPhase() + '",';
        str += '"' + this.getName() + '",';
        str += '"' + this.getName() + '"';
        return str;
    }
}

function getCSVFields () {
    return "Type,Summary,Description,Version,Client,Label";
}
function exportToCSV (fields, jsonData) {
    print("exportToCSV");
    print(fields);
    var itemsToPrint = 10;
    for (var key in jsonData) {
        print(jsonData[key].toString());
        if (itemsToPrint-- < 0)
            break;
    }
}