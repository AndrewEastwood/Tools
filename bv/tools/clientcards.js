//var os = require('os');
//console.log(os.platform());

var logger = require('../lib/logger.js').getLogger("clientDataCards");
var util = require('util');

var _settings = {
	limit : 5000,
	skip : 0,
	dirToExport : './data/cards',
	fileNamePattern : "export_d%s_p%d_%s.csv",
	pageCountToExport : -1,
	connection: {
		host : "localhost",
		dbname : "test",
		table: "demo"
	}
};
var _activeTasks = [];
var jiraClientsJsonValid = {};
var jiraClientsJsonWithErrors = {};
var jiraClientsJsonConv2 = {};

if (process.argv[2] == '?' || process.argv[2] == '--help')
	console.log("Export Client Cards To Jira Usage: [host] [dbanme] [table]");
else
	performExport(
		process.argv[2] || _settings.connection.host,
		process.argv[3] || _settings.connection.dbname,
		process.argv[4] || _settings.connection.table);


/********** general methods ************/

function exitHook () {
	logger.log('exit hook');
	process.exit(0);
}

function getRecordsRecursive (db, collection, limit, skip, pagesToExport, page) {

	_activeTasks.push(page);

	if (pagesToExport !== -1 && pagesToExport < page)
		return;

	logger.log(util.format('Performing data import [limit:%d; skip:%d; active page:%d]', limit, skip, page));
	collection.find({}, {_id:0}).limit(limit).skip(skip).toArray(function (err, records) {
		logger.log(util.format('Selected  %d record(s)', records.length));
		var data = getClientsInfo(records);
        logger.log('imported data: ' + (Object.getOwnPropertyNames(data.Error).length + Object.getOwnPropertyNames(data.Valid).length));
        if (!!data.Valid) {
			logger.log('performing export clients to csv file: ' + Object.getOwnPropertyNames(data.Valid).length);
			exportToCSV(getCSVFields(), data.Valid, page, 'ok');
		}
		if (!!data.Error) {
			logger.log('performing export clients with errors to csv file: ' + Object.getOwnPropertyNames(data.Error).length);
			exportToCSV(getCSVFields(), data.Error, page, 'err');
		}
        if (!!data.Conv2) {
            logger.log('performing export clients on conv2.0 to txt file: ' + Object.getOwnPropertyNames(data.Conv2).length);
            saveIntoFile(_settings.dirToExport, 'clientsOnConv2.txt', util.inspect(data.Conv2, true, null));
        }
		if (records.length == limit )	
			getRecordsRecursive(db, collection, limit, skip + limit, pagesToExport, page + 1);
		//else
		//	exitHook();
		_activeTasks.pop();
	});

}

function performExport (host, dbname, table) {

	logger.log("connectig to " + host);
	logger.log("using database " + dbname);
	logger.log("table " + table);

	var mongo = require('../lib/node_modules/mongodb');
	var server = new mongo.Server(host, 27017, {});
	var db = new mongo.Db(dbname, server, {safe:true});

	db.open(function(error, client){
		if (error) throw error;
		getRecordsRecursive(db, new mongo.Collection(client, table), _settings.limit, _settings.skip, _settings.pageCountToExport, 1);
	});
}
 
function getClientsInfo(jsonDataArray) {
    //var jiraClientsJson = {};
    var hasError = false;
    var hasValid = false;
    //console.log("getClientsInfo: " + jsonDataArray.length);
    saveIntoFile(_settings.dirToExport, 'client-dump.txt', util.inspect(jsonDataArray, true, null));
    var _log = "";
    var runnuniIndexTest = 0;
    for (var key in jsonDataArray) {
        //console.log(runnuniIndexTest);
        _log += runnuniIndexTest + " = " + jsonDataArray[key].name;

    	if (validateClientData(jsonDataArray[key])) {
            jiraClientsJsonValid[jsonDataArray[key].directory] = new clientDataObject(jsonDataArray[key], jiraClientsJsonValid);
            hasValid = true;
            _log += " [ok]";
        } else if (isOnConv2(jsonDataArray[key])) {
            jiraClientsJsonConv2[jsonDataArray[key].name] = jsonDataArray[key];
            _log += " [conv 2.0]";
        } else {
            jiraClientsJsonWithErrors[jsonDataArray[key].name] = new clientDataObject(jsonDataArray[key], jiraClientsJsonWithErrors);
            hasError = true;
            _log += " [error]";
        }
        _log += "\n";

        runnuniIndexTest++;
    }
    saveIntoFile(_settings.dirToExport, 'client-import.log', _log);
    var rez = {
        Conv2 : jiraClientsJsonConv2
    };
    if (hasError)
    	rez.Error = jiraClientsJsonWithErrors;
    if (hasValid)
    	rez.Valid = jiraClientsJsonValid;
    return rez;
}

function isOnConv2 (clData) {
    return (typeof(clData.platform) !== "undefined" && clData.platform == "Conv2");
}

function validateClientData (clData) {
    return (typeof(clData.directory) !== "undefined" &&
        typeof(clData.name) !== "undefined");
}

function clientDataObject(rawData, allRawData) {
    //print("clientDataObject");
    
    this.getBundleName = function () { 
        return rawData.bundle || "undefined";
    }
    this.getDirectoryName = function () { 
        return rawData.directory || "undefined";
    }
    this.getName = function () { 
        return rawData.name || "undefined";
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
        // generates description for jira

        var desc = {};

        desc["Bundle Name"] = this.getBundleName();
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

        if (typeof(rawData.esp) !== "undefined")
            desc["email provider"] = rawData.esp;

        var stringDesc = "";
        var value = "";

        for (var p in desc) {
            if (Array.isArray(desc[p]))
                value = desc[p].join(' \\\\ ');
            else
                value = desc[p];
            value = value || "undefined";
            stringDesc += "*" + p + "* " + (escape?value.replace(/\,/g,"\\,").replace(/\"/g, '\\"'):value) + " \\\\ ";
        }

        return stringDesc;
    }
    this.getPhase = function(asString) {
        if (asString)
            return "Unscheduled - Phase " + rawData.phase;
        return rawData.phase;
    }
    this.getUIversion = function (clientDirName) {
        var uiv = rawData.uiVersion;
        //dumpObjOnce(allRawData);
        if (!!!uiv && allRawData[this.getBundleName()] && this.getDirectoryName().toLowerCase() != this.getBundleName().toLowerCase()) {
            //logger.log(util.format('attempt to get ui version of bundle: %s; dir: %s; name: %s;', this.getBundleName(), this.getDirectoryName(), this.getName()));
            return allRawData[this.getBundleName()].getUIversion(clientDirName) || false;
            /*if (!!uiv)
                logger.log('ui version found: ' + uiv);*/
        }
        return this.getIGLink(clientDirName + "/config/bundleConfiguration.xml", uiv || "undefined");
    }
    this.toString = function () {
        var str = "Story,";
        str += '"Upgrade ' + this.getName() + '",';
        str += '"' + this.getJiraDescription(true) + '",';
        str += '"' + this.getPhase(true) + '",';
        str += '"' + this.getName() + '",';
        str += '"Upgrade, C2013, ' + this.getName() + '"';
        return str;
    }
}

var dump = true;
function dumpObjOnce (obj) {
    if (dump)
        console.dir(obj);
    dump = false;
}

function getCSVFields () {
    return "Type,Summary,Description,Version,Client,Label";
}

function exportToCSV (fields, jsonData, page, state) {
    //print("exportToCSV");
    var fs = require('fs');
    var fileName = util.format(_settings.fileNamePattern, new Date().getTime(), page, state);
    var csvString = fields + "\n";
    for (var key in jsonData)
        csvString += jsonData[key].toString() + "\n";
    //logger.log('Saving file: ' + fileName);

    saveIntoFile(_settings.dirToExport, fileName, csvString);

}


function saveIntoFile (dir, fname, data) {
    var fs = require('fs');
    if(!fs.existsSync(dir)) {
        fs.mkdir(dir);
    }
    fs.writeFile(dir + '/' + fname, data, function(err) {
        if(err) {
            console.log(err);
        } else {
            //console.log("The file was saved!");
            //logger.log(util.format('Saved %d records in the file %s', Object.getOwnPropertyNames(data).length, fname));
            if (_activeTasks.length == 0)
                exitHook();
        }
    });
}