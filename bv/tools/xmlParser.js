var  fs = require('fs'), 
	xml2js = require('../lib/node_modules/xml2js')
	util = require('util');

//console.log(process.argv[2]); // xml file
//console.log(process.argv[3]); // value to get


//while (true)
//	console.log("[INFO] xml parser. looking for value : XXXXXXXX");

var parser = new xml2js.Parser();
fs.readFile(process.argv[2], function (err, data) { 
	parser.parseString(data, function (err, result) {
		
		var _valueToReturn;
		//console.log(util.inspect(result), false, null);

		if (process.argv[3] == 'def') {
			switch (process.argv[4]) {
				case "dc" :
					_valueToReturn = getClientDisplayCode(result);
					break;
				case "cx" :
					_valueToReturn = getClientCluster(result);
					break;
				case "cname" : 
					_valueToReturn = getClientName(result);
					break;

			}
		} else
			_valueToReturn = getValue(result, process.argv[3]);


		console.log(optimizeValue(_valueToReturn));
	})
}); 




function conditionObj (conditionString) {

	var _find,
		_keyValueToMatch,
		_keyValueToReturn;

	if (conditionString[0] == ':')
		conditionString = conditionString.substr(1);

	var selector = conditionString.split('@');
	var matching = selector[0].split('=');

	//console.dir(selector);
	//console.dir(matching);

	return {
		find: matching[0],
		keyValueToMatch : matching[1],
		keyPropToReturn : selector[1],
		reached : false
	};
}

function optimizeValue (val) {
	//console.log("value type is " + typeof(val));
	return val.replace(/^\'|\'$/g, " ").trim();
}

function getValueByPath (jsonObj, path) {
	//console.log("getValueByPath " + path);
	var keys = Array.isArray(path) ? path : path.split('.');
	var val = jsonObj[keys.shift()];
	//console.dir(val);
	if (typeof(val) === "object")
		val = getValueByPath(val, keys);
	return val;
}

function getValueByCondition (jsonObj, cObj) {

	var val = false;
	for (var p in jsonObj) {
		if (cObj.reached)
			return val;
		//console.log("running key: " + p + " and value: " + jsonObj[p]);
		if (p == cObj.find && jsonObj[p] == cObj.keyValueToMatch) {
			//console.log("Requested path reached");
			cObj.reached = true;
			return jsonObj[cObj.keyPropToReturn];
		} else
			if (typeof(jsonObj[p]) == "object")
				val = getValueByCondition(jsonObj[p], cObj);
		
	}
	return val;
}

function getValue (jsonDoc, pathToProp) {
	//console.log(pathToProp);
	//console.dir(jsonDoc.beans.bean);
	if (pathToProp[0] == ':') {
		var cObj = new conditionObj(pathToProp);
		/*console.log("Looking for the key: [" + cObj.find
		 + "]; that has value: [" + cObj.keyValueToMatch
		  + "]; and return value by key: [" + cObj.keyPropToReturn + "]");*/
		return getValueByCondition(jsonDoc, cObj);
	}
	else
		return getValueByPath(jsonDoc, pathToProp);
}

/********/


function getClientDisplayCode (jsonDoc) {
	//for (var p in jsonDoc.client[0].display[0])
	//	console.log(p);
	return getValue(jsonDoc, "bundle.client.0.display.0.$.code");
	//console.dir(jsonDoc.client[0].display[0].$.code);
}

function getClientCluster (jsonDoc) {
	//for (var p in jsonDoc.client[0].display[0])
	//	console.log(p);
	//console.dir(jsonDoc.$.cluster);
	return getValue(jsonDoc, "bundle.$.cluster");
}

function getClientName (jsonDoc) {
	//for (var p in jsonDoc.client[0].display[0])
	//	console.log(p);
	//console.dir(jsonDoc.client[0].$.name);
	return getValue(jsonDoc, "bundle.client.0.$.name");
}

