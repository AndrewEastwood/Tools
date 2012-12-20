function main (val) {
	var  fs = require('fs'), 
		xml2js = require('../lib/node_modules/xml2js')
		util = require('util');

	var parser = new xml2js.Parser();
	fs.readFile(process.argv[2], function (err, data) { 
		parser.parseString(data, function (err, result) {
			
			var _valueToReturn;
			//console.log(util.inspect(result), false, null);

			if (process.argv[3][0] == '@') {
				switch (process.argv[3].substr(1)) {
					/* bundle */
					case "apps":
						_valueToReturn = getClientApps(result);
						break;
					case "dc":
						_valueToReturn = getClientDisplayCode(result);
						break;
					case "cx":
						_valueToReturn = getClientCluster(result);
						break;
					case "cname":
						_valueToReturn = getClientName(result);
						break;
					/* commons */
					case "apihostname":
						_valueToReturn = getClientApiHostName(result);
						break;
					/* display */
					case "bvhost":
						_valueToReturn = getClientBvHost(result);
						break;
					case "domain":
						_valueToReturn = getClientDomainNames(result);
						break;
					case "dispname":
						_valueToReturn = getClientDisplayName(result);
						break;
					case "homepage":
						_valueToReturn = getClientHomePageUrl(result);
						break;
					case "enckey":
						_valueToReturn = getClientEncodingKey(result);
						break;
					default:
						_valueToReturn = "Undefined function name: " + process.argv[4];
						break;
				}
			} else
				_valueToReturn = getValue(result, process.argv[3]);

			// print value 
			console.log(optimizeValue(_valueToReturn));
		})
	});
}

function help () {
	var _helpString = "Script Usage:\n\n";

	_helpString += "node scriptName.js [path/to/your/file.xml] [SELECTOR|@METHOD|:CONDITION]";
	_helpString += "\n\n";
	_helpString += "SELECTOR:\n";
	_helpString += "----------------------------\n";
	_helpString += ""
	_helpString += "\n\n";
	_helpString += "CONDITION:\n";
	_helpString += "----------------------------\n";
	_helpString += "Format: ':'"
	_helpString += "\n\n";
	_helpString += "@METHOD:\n";
	_helpString += "----------------------------\n";
	_helpString += ""

}

function optimizeValue (val) {
	//console.log("value type is " + typeof(val));
	if (!!val)
		return val.replace(/^\'|\'$/g, " ").trim();
	return "";
}

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

/**** configuration pre-defined selectors ****/

/* = bundle config */

function getClientApps (jsonDoc) {
	return getValue(jsonDoc, "bundle.client.0.display.0.$.apps");
}

function getClientDisplayCode (jsonDoc) {
	return getValue(jsonDoc, "bundle.client.0.display.0.$.code");
}

function getClientCluster (jsonDoc) {
	return getValue(jsonDoc, "bundle.$.cluster");
}

function getClientName (jsonDoc) {
	return getValue(jsonDoc, "bundle.client.0.$.name");
}

/* = common config */

function getClientApiHostName (jsonDoc) {
	return getValue(jsonDoc, ":name=apiHostName@value");
}

/* = display config */

function getClientBvHost (jsonDoc) {
	return getValue(jsonDoc, ":name=bvHost@value");
}

function getClientDomainNames (jsonDoc) {
	return getValue(jsonDoc, ":name=clientDomainNames@value");
}

function getClientDisplayName (jsonDoc) {
	return getValue(jsonDoc, ":name=displayName@value");
}

function getClientHomePageUrl (jsonDoc) {
	return getValue(jsonDoc, ":name=customerHomePageURL@value");
}

function getClientEncodingKey (jsonDoc) {
	return getValue(jsonDoc, ":name=encodingKey@value");
}