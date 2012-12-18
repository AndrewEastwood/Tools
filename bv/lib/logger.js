var _cache = {
	anonymous: {logdata : "", cache : true}
};
var _currentOwner = "anonymous";

exports.setup = function (owner, useCaching) {
	_currentOwner = owner || "anonymous";
	if (typeof(_cache[_currentOwner]) == "undefined")
		_cache[_currentOwner] = {logdata : "", cache : true};
	else
		_cache[_currentOwner].cache = useCaching;
    return exports;
}

exports.export = function (owner) {
	if (_cache[owner || _currentOwner] && _cache[owner || _currentOwner].cache)
		return _cache[owner || _currentOwner].logdata;
	return "";
}

exports.log = function (msg, level, owner) {
	//console.log(msg);
    var sign = " ";
    level = level || "info";
    // show short signs with messages
    if (level === 'warn') sign = "!";
    if (level === 'error') sign = "*";
    if (level === 'fail') sign = "X";
    // log message
    var message = "[" + level.toUpperCase() + "] " + new Date().toLocaleTimeString() + " " + sign + " : " + msg;
    console.log(message);
    // will be stored into the file
    //this.cache += "\n" + message;
    if (typeof(_cache[owner || _currentOwner]) !== "undefined" && _cache[owner || _currentOwner].cache)
    	_cache[owner || _currentOwner].logdata += message;
}