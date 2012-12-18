//var os = require('os');
//console.log(os.platform());

var logger = require('./logger.js').setup("clientDataCards");
var util = require('util');

var _settings = {
	limit : 500,
	skip : 0,
	dirToExport : 'data',
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

function performExport (host, dbname, table) {

	logger.log("connectig to " + host);
	logger.log("using database " + dbname);
	logger.log("table " + table);

	var mongo = require('mongodb');
	var server = new mongo.Server(host, 27017, {});
	var db = new mongo.Db(dbname, server, {safe:true});

	db.open(function(error, client){
		if (error) throw error;
		
		var collection = new mongo.Collection(client, table);
		var pgsToExport = _settings.pageCountToExport;
		var recToSkip = 0;
		var currPage = 1;

		//logger.log(collection.count);
		//logger.log(collection.length);
		//logger.log(collection.count());

		while ((_settings.pageCountToExport === -1) || pgsToExport > 0) {
			logger.log('Performing data import at page ' + currPage);

			var _records = collection.find({}, {_id:0}).limit(_settings.limit).skip(recToSkip);




			_records.count(function (e,c){
				logger.log(c);
			});
			
			break;
			processFetchedRecords(db, _records, currPage);

			/*collection.find({}, {_id:0}).limit(_settings.limit).skip(recToSkip).toArray(function(err, results){
				//console.dir(results);
				exportToCSV(getCSVFields(), getClientsInfo(clients));
			});*/
			//logger.log('received records count: ' + _records.count());
			if (_records.count() < _settings.limit)
				break;
			//console.dir(_records);
			recToSkip += _settings.limit;
			if (_settings.pageCountToExport !== -1)
				pgsToExport--;
			currPage++;
		}
		logger.log('end of main loop');
		//process.exit(0);
	});
	//process.exit(1);
}

function processFetchedRecords (db, records, page) {
	logger.log('processFetchedRecords is triggered with : page=' + page);
	logger.log('records to process: ' + records.count());
	
	_activeTasks.push(page);

	records.toArray(function(err, results){
		logger.log('reading clients information: ' + results.length);
		var data = getClientsInfo(results);
		logger.log('performing export to csv file');
		exportToCSV(getCSVFields(), data.Valid, page, 'ok');
		exportToCSV(getCSVFields(), data.Error, page, 'err');

		_activeTasks.pop();

		if (_activeTasks.length == 0) {
			logger.log('all tasks were completed.');
			db.close();
			process.exit(1);
		}
	});
}
 
function getClientsInfo(jsonDataArray) {
    var jiraClientsJsonValid = {};
    var jiraClientsJsonWithErrors = {};
    //var jiraClientsJson = {};
    for (var key in jsonDataArray)
    	if (typeof(jsonDataArray[key].directory) !== "undefined")
            jiraClientsJsonValid[jsonDataArray[key].name] = new clientDataObject(jsonDataArray[key]);
        else
            jiraClientsJsonWithErrors[jsonDataArray[key].name] = new clientDataObject(jsonDataArray[key]);
    return {Valid:jiraClientsJsonValid, Error:jiraClientsJsonWithErrors};
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
function exportToCSV (fields, jsonData, page, state) {
    //print("exportToCSV");
    var fs = require('fs');
    var fileName = util.format(_settings.fileNamePattern, new Date().toLocaleTimeString(), page, state);
    var csvString = fields + "\n";
    for (var key in jsonData)
        csvString += jsonData[key].toString() + "\n";
    logger.log('Saving file: ' + fileName);
    fs.writeFile(_settings.dirToExport + '/' + fileName, csvString);
}