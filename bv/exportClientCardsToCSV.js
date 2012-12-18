//var os = require('os');
//console.log(os.platform());

var logger = require('./lib/logger.js').setup("clientDataCards");
var util = require('util');

var _settings = {
	limit : 500,
	skip : 0,
	dirToExport : 'data/cards',
	fileNamePattern : "export_d%s_p%d_%s.csv",
	pageCountToExport : -1,
	connection: {
		host : "localhost",
		dbname : "test",
		table: "demo"
	}
};
var _activeTasks = [];

if (process.argv[2] == '?' || process.argv[2] == '--help')
	console.log("Usage: [host] [dbanme] [table]");
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
		if (!!data.Valid) {
			logger.log('performing export to csv file: ' + Object.getOwnPropertyNames(data.Valid).length);
			exportToCSV(getCSVFields(), data.Valid, page, 'ok');
		}
		if (!!data.Error) {
			logger.log('performing export to csv file: ' + Object.getOwnPropertyNames(data.Error).length);
			exportToCSV(getCSVFields(), data.Error, page, 'err');
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

	var mongo = require('mongodb');
	var server = new mongo.Server(host, 27017, {});
	var db = new mongo.Db(dbname, server, {safe:true});

	db.open(function(error, client){
		if (error) throw error;
		getRecordsRecursive(db, new mongo.Collection(client, table), _settings.limit, _settings.skip, _settings.pageCountToExport, 1);
	});
}
 
function getClientsInfo(jsonDataArray) {
    var jiraClientsJsonValid = {};
    var jiraClientsJsonWithErrors = {};
    //var jiraClientsJson = {};
    var hasError = false;
    var hasValid = false;
    for (var key in jsonDataArray)
    	if (typeof(jsonDataArray[key].directory) !== "undefined") {
            jiraClientsJsonValid[jsonDataArray[key].name] = new clientDataObject(jsonDataArray[key]);
            hasValid = true;
        } else {
            jiraClientsJsonWithErrors[jsonDataArray[key].name] = new clientDataObject(jsonDataArray[key]);
            hasError = true;
        }
    var rez = {};
    if (hasError)
    	rez.Error = jiraClientsJsonWithErrors;
    if (hasValid)
    	rez.Valid = jiraClientsJsonValid;
    return rez;
}

function clientDataObject(rawData /* =, allRawData */ ) {
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
        // generates description for jira

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
    this.getPhase = function() {
        return rawData.phase;
    }
    this.getUIversion = function (clientDirName) {
        return this.getIGLink(clientDirName + "/config/bundleConfiguration.xml", rawData.uiVersion || "unable to identify");
    }
    this.toString = function () {
        var str = "Story,";
        str += '"Upgrade ' + this.getName() + '",';
        str += '"' + this.getJiraDescription(true) + '",';
        str += '"' + "Unscheduled - Phase " + this.getPhase() + '",';
        str += '"' + this.getName() + '",';
        str += '"Upgrade, C2013, ' + this.getName() + '"';
        return str;
    }
}

function getCSVFields () {
    return "Type,Summary,Description,Version,Client,Label";
}

function exportToCSV (fields, jsonData, page, state) {
    //print("exportToCSV");
    var fs = require('fs');
    var fileName = util.format(_settings.fileNamePattern, new Date().toLocaleTimeString(), page, state);
    var csvString = fields + "\n";
    for (var key in jsonData)
        csvString += jsonData[key].toString() + "\n";
    //logger.log('Saving file: ' + fileName);
    fs.writeFile(_settings.dirToExport + '/' + fileName, csvString, function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        //console.log("The file was saved!");
    		logger.log(util.format('Saved %d records in the file %s', Object.getOwnPropertyNames(jsonData).length, fileName));
	        if (_activeTasks.length == 0)
	        	exitHook();
	    }
	});
}